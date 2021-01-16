import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Collect } from '../models/Collect';
import { CollectService } from '../shared/collect.service';
import { Category } from '../models/Category';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent implements OnInit {

  users: any;
  collects: any;
  categories: any;
  connectedUser: any;
  UserToLogOut: User[];
  dataGot: User[];
  dataColGot: Collect[];
  dataCatGot: Category[];
  verifyUser: User[];
  id;
  username;
  email;
  role;
  totalRecords: number;
  page: number=1;
  usernameToSearch: string;
  usernameToShow: string;
  nbrStud :number =0;
  nbrTeach : number =0;
  constructor(private userService: UserService,
    private collectService: CollectService,
    private catService: CategoryService, public router: Router) { }

    deleteUser(userId) {
      if (confirm("Are you sure to delete this Teacher with ID: "+userId+" ?")) 
      {
        this.userService.deleteUser(userId).subscribe(data => {
          alert("Teacher Deleted !");
          this.router.navigate(['/admin']);
        })
         
      }
      }

  detailsUser(idP, usernameP, emailP, roleP) {
    this.id = idP;
    this.username = usernameP;
    this.email = emailP;
    this.role = roleP;
  }

  searchByUsername() {
    if (this.usernameToSearch !== "") {
    this.dataGot = this.dataGot.filter(res => {
      return res.firstname.toLocaleLowerCase().match(this.usernameToSearch.toLocaleLowerCase());
    })
  } else {
    this.nbrTeach = 0;
    this.nbrStud = 0;
    this.ngOnInit();
  }
  }

  logout() {
    if(confirm("Are you sure you want to log out ?")) {
      this.UserToLogOut = this.connectedUser;
      for (let i = 0; i<this.UserToLogOut.length; i++) {
      this.userService.deleteConnectedUser(this.UserToLogOut[i].id).subscribe(data => {
      this.router.navigateByUrl('/login');
    })
  }
  }
}

  ngOnInit(): void {
   
    this.userService.getUsers().subscribe((e) => {
      this.users = e;
      this.dataGot = this.users;
      for (let i=0;i<this.dataGot.length;i++)
      {
  
        if (this.dataGot[i].role == 1)
        {
          this.nbrTeach = this.nbrTeach+1;
          console.log("teeeeeeeeeeeeeach"+this.nbrTeach);
      
        }
        if (this.dataGot[i].role == 2)
        {
  
          this.nbrStud = this.nbrStud+1;
          console.log("sttttttttttt"+this.nbrStud);
        }
        }
    })
    this.userService.getConnectedUser().subscribe(c => {
      this.connectedUser = c;
      this.verifyUser = this.connectedUser;
      if(this.verifyUser.length == 0) {
        this.router.navigateByUrl("/login");
      }
      
      for(let i=0; i<this.verifyUser.length; i++) {
        if(this.verifyUser.length == 1) {
        this.usernameToShow = this.verifyUser[i].username;
        break;
        }
      }
    })
  }

}

