import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  verifInfo;
  admins: any;
  adminConnected: any;
  adminLoggedIn: any;
  verifyUser: Admin[];
  dataGot: Admin[];
  i;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService,
    private httpClient: HttpClient) { 
    this.signInForm = formBuilder.group({
      emailField: ['', [Validators.required, Validators.email]],
      passField: ['', [Validators.required]]
    })
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("../../assets/images/education.jpg")';
    this.elementRef.nativeElement.ownerDocument.body.style.height = '150%';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = '100% 100%';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundRepeat = 'no-repeat';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#01123a';
  }

 signIn() {
   /*if (this.signInForm.value.emailField == "admin@saviors.net" && this.signInForm.value.passField == "123456") {
     this.router.navigate(['/admin']);
   } else {
     this.verifInfo = "Verify the info you entered !";
   }*/

   //this.userService.getUser(this.signInForm.value.emailField, this.signInForm.value.passField);
   this.dataGot = this.admins;
   for (let i = 0; i<this.dataGot.length; i++) {
     if (this.dataGot[i].email == this.signInForm.value.emailField
      && this.dataGot[i].password == this.signInForm.value.passField) {
        this.adminConnected = {
          username: this.dataGot[i].username,
          email: this.signInForm.value.emailField, 
          password: this.signInForm.value.passField,
          role: Role.admin
         }
       this.userService.addConnectedUser(this.adminConnected).subscribe(data => {
         
       });
       this.router.navigate(['/admin']);
       
     } else {
       this.verifInfo = 'Please verify the info you entered !';
     }
    //  //Assoc Verification
    //  if (this.dataGot[i].email == this.signInForm.value.emailField
    //   && this.dataGot[i].password == this.signInForm.value.passField
    //   && this.dataGot[i].role == Role.association) {
    //     this.userConnected = {
    //       email: this.signInForm.value.emailField, 
    //       password: this.signInForm.value.passField,
    //       role: Role.association }
    //    this.userService.addConnectedUser(this.userConnected).subscribe(data => {});
    //    this.router.navigate(['/association']);
    //  }
    //  //Member Verification
    //  if (this.dataGot[i].email == this.signInForm.value.emailField
    //   && this.dataGot[i].password == this.signInForm.value.passField
    //   && this.dataGot[i].role == Role.member) {
    //     this.userConnected = {
    //       email: this.signInForm.value.emailField, 
    //       password: this.signInForm.value.passField,
    //       role: Role.member }
    //    this.userService.addConnectedUser(this.userConnected).subscribe(data => {});
    //    this.router.navigate(['/member']);
    //  }
   }

 }

  ngOnInit(): void {
    this.userService.getAdmins().subscribe(e => {
      this.admins = e;
    })
    this.userService.getConnectedUser().subscribe(c => {
      this.adminLoggedIn = c;
      this.verifyUser = this.adminLoggedIn;
      for (let i = 0; i<this.verifyUser.length; i++) {
        if (this.verifyUser[i].role == 0) {
          this.router.navigateByUrl("/admin");
        }
       
      }
    })
  }

}
