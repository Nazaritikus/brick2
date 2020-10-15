import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
    `.form{
      max-width: 26rem;
      margin: 4% auto;
      padding: 24px;
      border-radius: 30px;
    }
    `
  ]
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submited: boolean = false
  message: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/admin', 'dashboard'])
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params.loginAgain) {
        this.message = 'Для продовження потрібна авторизація.'
      } else if(params.authFailed){
        this.message = 'У вас немає прав доступу до бази даних.'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.submited = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submited = false
    }, () => {
      this.submited = false
    })
  }
}
