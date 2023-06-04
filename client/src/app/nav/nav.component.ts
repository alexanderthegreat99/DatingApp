import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  model: any = {};
  //loggedIn= false;
  //currentUser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
   // this.currentUser$ = this.accountService.currentUser$;
  }
 
  login() {
    //console.log("login with model: ", this.model);
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members')
        this.toast.success({detail:"SUCCESS",summary:'Login Sucess!', duration: 5000});
      },
      error: error =>  {
      console.log("error: ", error);

      this.toast.error({detail:"ERROR",summary:'Login failed! Try again.', duration: 5000});

    }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
