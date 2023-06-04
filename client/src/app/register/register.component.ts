import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor(private accountService: AccountService, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
        this.toast.success({detail:"SUCCESS",summary:'Login Sucess!', duration: 5000});
      },
      error: error => {
        console.log("error: ", error);

        this.toast.error({detail:"ERROR",summary:'Register failed! Try again.', duration: 5000});

      }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}