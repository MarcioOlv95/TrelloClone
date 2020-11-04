import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Utils } from '../_helpers/utils';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService,
              private Utils: Utils,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        

        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['board']);
      },
      err => {
        console.log('erros:', err)

        this.errorMessage = err.error.message;
        this.alertService.danger(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }

}
