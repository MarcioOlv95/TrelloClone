import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class LoginActivate implements CanActivate {
  
    constructor(
                private router: Router,
                private tokenStorage: TokenStorageService,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean>|boolean {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['login']);
    }
    return true;
  }
}