import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  #authService = inject(AuthService)
  #router = inject(Router)

  constructor() {
  }

  canActivate(): boolean {
    if (this.#authService.isAuthenticated()) {
      return true;
    } else {
      this.#router.navigate(['/login']);
      return false;
    }
  }
}
