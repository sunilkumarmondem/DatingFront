import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { OutBoxmessagesComponent } from './out-boxmessages/out-boxmessages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'members', component:MemberListComponent, canActivate:[AuthGuard]},
  {path:'members/:id', component:MemberDetailComponent,canActivate:[AuthGuard]},
  {path:'member/edit', component:MemberEditComponent,canActivate:[AuthGuard]},
  {path:'lists', component:ListsComponent, canActivate:[AuthGuard]},
  {path:'messages', component:MessagesComponent, canActivate:[AuthGuard]},
  {path:'outboxMessages', component:OutBoxmessagesComponent, canActivate:[AuthGuard]},
  {path:'**', component:HomeComponent, pathMatch:'full'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
