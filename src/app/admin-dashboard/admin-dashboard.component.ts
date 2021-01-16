import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../shared/user.service';
import { CollectService } from '../shared/collect.service';
import { Collect } from '../models/Collect';
import { CategoryService } from '../shared/category.service';
import { Category } from '../models/Category';
import { Role } from '../models/Role';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: any;
 
  connectedUser: any;
  UserToLogOut: User[];
  verifyUser: User[];
  dataColGot: Collect[];
  dataCatGot: Category[];
  dataGot: User[];
  dataOthersGot: User[];
  totalRecords: number;
  page: number=1;
  usernameToShow: string;
  otherUsers: any;
  nbrStud :number =0;
  nbrTeach : number =0;


  constructor(private userService: UserService, 
    private collectService: CollectService,
    private catService: CategoryService, private router: Router) { }

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


    
    this.userService.getAdmins().subscribe(e => {
      this.users = e; 
      this.dataGot = this.users;
    })

    this.userService.getUsers().subscribe(o => 
      {
      this.otherUsers = o;
      this.dataOthersGot = this.otherUsers;

      for (let i=0;i<this.dataOthersGot.length;i++)
    {

      if (this.dataOthersGot[i].role == 1)
      {
        this.nbrTeach = this.nbrTeach+1;
        console.log("teeeeeeeeeeeeeach"+this.nbrTeach);
    
      }
      if (this.dataOthersGot[i].role == 2)
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
