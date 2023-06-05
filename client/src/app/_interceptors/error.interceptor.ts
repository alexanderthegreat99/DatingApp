import { Injectable } from '@angular/core';
 import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
   HttpErrorResponse
 } from '@angular/common/http';
 import { catchError, Observable } from 'rxjs';
 import { NavigationExtras, Router } from '@angular/router';
 import { NgToastService } from 'ng-angular-popup';

 @Injectable()
 export class ErrorInterceptor implements HttpInterceptor {

   constructor(private router: Router, private toast: NgToastService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request).pipe(
       catchError((error: HttpErrorResponse) => {
         if (error) {
           switch (error.status) {
             case 400:
               if (error.error.errors) {
                 const modelStateErrors = [];
                 for (const key in error.error.errors) {
                   if (error.error.errors[key]) {
                     modelStateErrors.push(error.error.errors[key])
                   }
                 }
                 throw modelStateErrors.flat();
               } else {
                // this.toast.error(error.error, error.status.toString())
                 this.toast.error({detail:error.error,summary: error.status.toString(), duration: 5000});
               }
               break;
             case 401:
               this.toast.error({detail:"Unauthorised",summary: error.status.toString(), duration: 5000});
               break;
             case 404:
               this.router.navigateByUrl('/not-found');
               break;
             case 500:
               const navigationExtras: NavigationExtras = {state: {error: error.error}};
               this.router.navigateByUrl('/server-error', navigationExtras);
               break;
             default:
               this.toast.error({detail:"Unexpected Error",summary: 'Something unexpected went wrong', duration: 5000});
               console.log(error);
               break;
           }
         }
         throw error;
       })
     )
   }
 }