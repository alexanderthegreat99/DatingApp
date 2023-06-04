import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map} from 'rxjs';
import { AccountService } from '../_services/account.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor(private accountService: AccountService, private toast: NgToastService){}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        else {
          this.toast.error({detail:"ERROR",summary:'Sign in to access this route.', duration: 5000});
          return false
        }
      })
      )
  }
}
