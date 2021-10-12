import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators'
import{ Router}  from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth,
    private router: Router ){}

  isNullOrUndefined(value: any) {
    return value === null || value === undefined;
    }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.AFauth.authState.pipe(map( auth =>{
        if(this.isNullOrUndefined(auth)){
          return true;
        }else{
          this.router.navigate(['/menu'])
          return false;
        }
   
       }))
      
  }
  
}
