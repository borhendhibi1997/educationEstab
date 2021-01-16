import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Admin } from '../models/Admin';
import { Role } from '../models/Role';

@Component({
  selector: 'app-sigu-up-admin',
  templateUrl: './sigu-up-admin.component.html',
  styleUrls: ['./sigu-up-admin.component.css']
})
export class SiguUpAdminComponent implements OnInit {

  signUpForm: FormGroup;
  verifInfo = "";
  admins: any;
  dataGot: Admin[];
  verifyUser: Admin[];
  i;
  userSignedUp: any;
  userLoggedIn: any;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService,
    private httpClient: HttpClient) { 
    this.signUpForm = formBuilder.group({
      usernameField: ['', [Validators.required, Validators.minLength(6)]],
      emailField: ['', [Validators.required, Validators.email]],
      passField: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassField: ['', [Validators.required, Validators.minLength(6)]]
      
    }, {
      validator: this.ConfirmedValidator('passField', 'confirmPassField')
    })
  }

  // ngAfterViewInit(){
  //   this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#343A40';
  // }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

 signUp() {
   //this.userService.getUser(this.signUpForm.value.emailField, this.signUpForm.value.passField);
  
   this.dataGot = this.admins;
   for (let i = 0; i<this.dataGot.length; i++) {
     if (this.dataGot[i].email == this.signUpForm.value.emailField
      || this.dataGot[i].username == this.signUpForm.value.usernameField) {
        this.verifInfo = "User already exists !";
        break;
     } else {
       this.verifInfo = "";
     
        
     this.userSignedUp = { username: this.signUpForm.value.usernameField, 
       email: this.signUpForm.value.emailField, 
       password: this.signUpForm.value.passField,
       role: Role.admin }
     }
   
   }
   if (this.verifInfo == "") {
   this.userService.addAdmin(this.userSignedUp).subscribe(data => {
    alert("Account created successfully !\nYou will be redirected to the login page !");
    this.router.navigate(['/login']);
  });
  }
   
 }
 ngOnInit(): void {
  this.userService.getAdmins().subscribe(e => {
    this.admins = e;
  })
  this.userService.getConnectedUser().subscribe(c => {
    this.userLoggedIn = c;
    this.verifyUser = this.userLoggedIn;
    for (let i = 0; i<this.verifyUser.length; i++) {
      if (this.verifyUser[i].role == 0) {
        this.router.navigateByUrl("/admin");
      }
      else
      {
        this.router.navigateByUrl("/home");
      }
     
    }
  })
}
}

