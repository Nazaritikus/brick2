import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {fBAuthResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private httpClient: HttpClient) {
  }

  get token(): string{
    const expDate = new Date(localStorage.getItem('fb-expires'))
    if(new Date() > expDate){
      this.logOut()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User) : Observable<any>{
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logOut(){
    this.setToken(null)
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        this.error$.next('Перевірте правильність введених даних для входу в систему.')
        break;
      case 'USER_DISABLED':
        this.error$.next('Цей користувач заблокований. Зверніться до адміністратора.')
        break;
    }

    return throwError(error)
  }

  private setToken(response: fBAuthResponse | null){
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-expires', expDate.toString())
    } else {
      localStorage.clear()
    }

  }
}
