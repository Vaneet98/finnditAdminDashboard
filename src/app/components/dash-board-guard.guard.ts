import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ServiceService} from "../service.service"
@Injectable({
  providedIn: 'root'
})
export class DashBoardGuardGuard implements CanActivate {
  constructor(private loginservice: ServiceService,private router: Router) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(localStorage.getItem('jwt'))  {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    }
   
}
