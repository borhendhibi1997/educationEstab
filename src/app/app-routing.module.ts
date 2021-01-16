import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddCollectComponent } from './add-collect/add-collect.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AssociationHomeComponent } from './association-home/association-home.component';
import { DetailsCollectComponent } from './details-collect/details-collect.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ManageCollectsComponent } from './manage-collects/manage-collects.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManagersUsersComponent } from './managers-users/managers-users.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { SignupTeacherComponent } from './signup-teacher/signup-teacher.component';
import { SignupComponent } from './signup/signup.component';
import { SiguUpAdminComponent } from './sigu-up-admin/sigu-up-admin.component';



const routes: Routes = [
  { path: "login", component: LoginComponent},

  { path: "admin", component: AdminDashboardComponent },
  { path: "signupstudent", component: SignupComponent },
  { path: "signupteacher", component: SignupTeacherComponent },
  { path: "admin/manage-students", component: ManagersUsersComponent },
  { path: "admin/manage-teachers", component: ManageTeachersComponent },
  { path: "admin/manage-users/add-user", component: AddUserComponent },
  { path: "association", component: AssociationHomeComponent },
  { path: "member", component: MemberHomeComponent },
  { path: "association/manage-collects", component: ManageCollectsComponent },
  { path: "association/manage-collects/add-collect", component: AddCollectComponent },
  { path: "association/manage-collects/add-category", component: AddCategoryComponent },
  { path: "home", component: HomePageComponent },
  { path : "signupagentadmin" , component: SiguUpAdminComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
