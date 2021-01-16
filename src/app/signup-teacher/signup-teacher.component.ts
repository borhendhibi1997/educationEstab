import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Role } from '../models/Role';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  signUpForm: FormGroup;
  verifInfo = "";
  users: any;
  dataGot: User[];
  verifyUser: User[];
  roles: any =  ['Student', 'Teacher'];
  role;
  roleIndex;
  i;
  userSignedUp: any;
  userLoggedIn: any;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService,
    private httpClient: HttpClient) { 
    this.signUpForm = formBuilder.group({
      firstnameField: ['', [Validators.required, Validators.minLength(3)]],
      lastnameField: ['', [Validators.required, Validators.minLength(4)]],
      emailField: ['', [Validators.required, Validators.email]],
      phonenumberField: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      dateField: ['', [Validators.required]],
      addressField:['',[Validators.required,Validators.minLength(6)]],
      gradeField:['',[Validators.required,Validators.minLength(6)]]
    }, {
      
    })
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundImage = 'url("../../assets/images/education.jpg")';
    this.elementRef.nativeElement.ownerDocument.body.style.height = '150%';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = '100% 100%';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundRepeat = 'no-repeat';
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#01123a';
  }


 signUp() {
   //this.userService.getUser(this.signUpForm.value.emailField, this.signUpForm.value.passField);
   //this.role = this.signUpForm.get('roleField').value;
   this.dataGot = this.users;
   for (let i = 0; i<this.dataGot.length; i++) {
     if (this.dataGot[i].email == this.signUpForm.value.emailField  ) {
        this.verifInfo = "User already exists !";
        break;
     } else {
       this.verifInfo = "";
     
     this.userSignedUp = { firstname: this.signUpForm.value.firstnameField, 
      lastname: this.signUpForm.value.lastnameField,
       email: this.signUpForm.value.emailField, 
       PhoneNumber: this.signUpForm.value.phonenumberField,
       dateofBirth: this.signUpForm.value.dateField,
       addressField: this.signUpForm.value.addressField,
       gradeField : this.signUpForm.value.gradeField,
       role: Role.teacher
      }
     }
   
   }
   if (this.verifInfo == "") {
   this.userService.addUser(this.userSignedUp).subscribe(data => {
    alert("Successful  Registration !");
    this.router.navigate(['/home']);
  });
  }
   
 }
 ngOnInit(): void {
  this.userService.getUsers().subscribe(e => {
    this.users = e;
  })
  this.userService.getConnectedUser().subscribe(c => {
    this.userLoggedIn = c;
    this.verifyUser = this.userLoggedIn;
    for (let i = 0; i<this.verifyUser.length; i++) {
      if (this.verifyUser[i].role == 0) {
        this.router.navigateByUrl("/admin");
      }
      if (this.verifyUser[i].role == 1) {
        this.router.navigateByUrl("/association");
      }
    }
  })
}
}
