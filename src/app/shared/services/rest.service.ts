import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewItem} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(newPost: NewItem, region: string): Observable<NewItem>{
    return this.httpClient.post<NewItem>(`${environment.firebaseConfig.databaseURL}/${region}.json`, newPost)
  }

  getAllFromRegion(region: string): Observable<any> {
    return this.httpClient.get(`${environment.firebaseConfig.databaseURL}/${region}.json`)
      .pipe(
        map((responce: {[key: string]: any}) => {
          return Object
            .keys(responce)
            .map(key => ({
              ...responce[key],
              id: key,
              date: new Date(responce[key].date)
            }))
        })
      )
  }

  getItemById(id: string, region: string): Observable<NewItem>{
    return this.httpClient.get<NewItem>(`${environment.firebaseConfig.databaseURL}/${region}/${id}.json`)
  }

  updateInfo(id: string, region: string, item: NewItem): Observable<NewItem>{
    return this.httpClient.patch<NewItem>(`${environment.firebaseConfig.databaseURL}/${region}/${id}.json`, item)
  }

}
