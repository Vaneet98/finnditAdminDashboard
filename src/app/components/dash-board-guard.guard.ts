import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBoardGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('token') === 'token') {
        this.router.navigate(['/dashboard']);
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
  
}
