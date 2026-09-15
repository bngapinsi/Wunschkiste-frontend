import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(Auth).loggedIn() ? true : inject(Router).navigate(['/']);
};