import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/services/auth.service';
import { dictionaryRoutes } from '@app/shared/dictionaries/dictionary.routes';

export const unauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // if (authService.isLogged()) {
  //   router.navigate([dictionaryRoutes.home]);
  //   return false;
  // }
  return true;
};
