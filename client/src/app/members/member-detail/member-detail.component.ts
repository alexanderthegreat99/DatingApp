import { Component, OnInit, ViewChild } from '@angular/core';
 import { ActivatedRoute, Router} from '@angular/router';
 
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { take, tap } from 'rxjs';
 //import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
 import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
 import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';


 @Component({
   selector: 'app-member-detail',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.css']
 })
 export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
   member: Member = {} as Member;
   galleryOptions: NgxGalleryOptions[] = [];
   galleryImages: NgxGalleryImage[] = [];
   messages: Message[] = [];
   activeTab?: TabDirective;
   user?: User;

  
   //constructor(private memberService: MembersService, private route: ActivatedRoute,  private messageService: MessageService,  public presenceService: PresenceService) { }
   constructor(private accountService: AccountService, private route: ActivatedRoute, 
    private messageService: MessageService, public presenceService: PresenceService, 
    private router: Router) {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
          next: user => {
            if (user) this.user = user;
          }
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }
   ngOnInit(): void {
     //this.loadMember();
     this.route.data.subscribe({
      next: data => this.member = data['member']
     })
    // this.loadMessages();
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })
     this.galleryOptions = [
       {
         width: '500px',
         height: '500px',
         imagePercent: 100,
         thumbnailsColumns: 4,
         imageAnimation: NgxGalleryAnimation.Slide,
         preview: false
       }
     ]
     this.galleryImages = this.getImages();
   }

   getImages() {
     if (!this.member) return [];
     const imageUrls = [];
     for (const photo of this.member.photos) {
       imageUrls.push({
         small: photo.url,
         medium: photo.url,
         big: photo.url
       })
     }
     return imageUrls;
   }
   
  //  loadMember() {
  //    var username = this.route.snapshot.paramMap.get('username');
  //    if (!username) return;
  //    this.memberService.getMember(username).subscribe({
  //      next: member => {
  //        this.member = member;
  //        //this.galleryImages = this.getImages();
  //      }
  //    })
  //  }
   selectTab(heading: string) {
    //if (!this.memberTabs) console.log("hi")
    if (this.memberTabs) {
      
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true
    }
  }
   loadMessages() {
    if (this.member) {
      this.messageService.getMessageThread(this.member.userName)
      .subscribe({
        next: messages => this.messages = messages
         
      })
    }
  }
   onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }
  //  loadMessages() {
  //   if (this.member) {
  //     this.messageService.getMessageThread(this.member.userName)
  //     .subscribe({
  //       next: messages => this.messages = messages
         
  //     })
  //   }
  // }

 }