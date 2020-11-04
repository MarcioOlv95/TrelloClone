import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Utils } from '../_helpers/utils';
import { AlertService } from 'ngx-alerts';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private Utils: Utils,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        
        this.alertService.success('Usuário registrado com sucesso')

        this.router.navigate(['/home'])

        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.alertService.danger(this.errorMessage);
        this.isSignUpFailed = true;
      }
    );
  }

}
