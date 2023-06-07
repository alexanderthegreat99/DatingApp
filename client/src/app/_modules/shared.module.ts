import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgToastModule } from 'ng-angular-popup';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryAction, NgxGalleryModule } from '@kolkov/ngx-gallery';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgToastModule,
    NgxGalleryModule
  ],
  exports: [
    BsDropdownModule,
    NgToastModule,
    TabsModule,
    NgxGalleryModule
  ]
})
export class SharedModule { }
