import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Dating App';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService, private toast: NgToastService){}

  ngOnInit(): void {
    
     // this.getUsers();
      this.setCurrentUser();
  }
  // getUsers(){
  //   this.http.get('https://localhost:5001/api/users').subscribe({
  //     next: response => this.users = response,
  //     error: error => console.log(error),
  //     complete: () => {
  //       console.log('request has been completed')
  //     }
  //   })
  // }
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
  test(){
    this.toast.success({detail:"ERROR",summary:'Login failed! Try again.', duration: 5000});
  }
}
