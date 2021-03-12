import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	user 		  : Observable<firebase.User>;
	userData   : any;
   isLoggedIn = false;
   token: string;
   constructor(private firebaseAuth : AngularFireAuth,
               private router : Router,
               private toastr : ToastrService) {
   	this.user = firebaseAuth.authState;
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   getLocalStorageUser(){
      this.token = localStorage.getItem("token");
      if(this.token) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }
   }

  	/*
    * signupUserProfile method save email and password into firabse &
    * signupUserProfile method save the user sign in data into local storage.
    */
   signupUserProfile(value) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(value.email, value.password)
      .then(value => {
        this.toastr.success('Successfully Signed Up!');
        this.setLocalUserProfile(value);
        this.router.navigate(['/']);
      })
      .catch(err => {
         this.toastr.error(err.message);
      });
   }

   /*
    * loginUser fuction used to login
    */
   loginUser(value) {
      this.firebaseAuth
      .signInWithEmailAndPassword(value.email,value.password)
      .then(value => {
         this.setLocalUserProfile(value);
         this.toastr.success('Successfully Logged In!');
         this.router.navigate(['/']);
      })
      .catch(err => {
         this.toastr.error(err.message);
      });
   }

   /*
    * resetPassword is used to reset your password
    */
   resetPassword(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
          	this.toastr.success("A password reset link has been sent to this email.");
          	this.router.navigate(['/session/login']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }


   /*
    * resetPasswordV2 is used to reset your password
    */
   resetPasswordV2(value) {
      this.firebaseAuth.sendPasswordResetEmail(value.email)
         .then(value => {
             this.toastr.success("A password reset link has been sent to this email.");
             this.router.navigate(['/session/login']);
         })
         .catch(err => {
            this.toastr.error(err.message);
         });
   }

   /*
    * logOut function is used to sign out
    */
   logOut() {
      this.firebaseAuth
      .signOut();
      localStorage.removeItem("userProfile");
      localStorage.clear();
      this.isLoggedIn = false;
      this.toastr.success("Successfully logged out!");
      this.router.navigate(['/session/login']);
   }
   logOutWhenLoginError(){
      this.firebaseAuth
      .signOut();
      localStorage.removeItem("userProfile");
      localStorage.clear();
      this.isLoggedIn = false;
      this.router.navigate(['/session/login']);
   }

   /*
    * setLocalUserProfile function is used to set local user profile data.
    */
   setLocalUserProfile(token){
      // localStorage.setItem("userProfile", JSON.stringify(value));
      // localStorage.setItem("userId", value.userId);
      // localStorage.setItem("username", value.username);
      localStorage.setItem("token",token)
      // this.getLocalStorageUser();
      this.isLoggedIn = true;
   }
}
