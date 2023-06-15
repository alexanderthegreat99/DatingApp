
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;

  constructor(private memberService: MembersService, private toast: NgToastService) { }

  ngOnInit(): void {
  }
  addLike(member: Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toast.success({detail:"SUCCESS",summary:'You have liked ' + member.knownAs, duration: 5000})
    })
  }


}