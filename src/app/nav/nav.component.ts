import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

 model:any = {};
 userName:string;

 loggedIn:boolean = false;

  constructor(private accountService:AccountService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
      this.router.navigateByUrl('/members');
      this.loggedIn = true;
    },error =>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout(){
    this.accountService.logout();
    this.loggedIn = false;
    this.router.navigateByUrl('/');
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user =>{
      this.loggedIn = !!user;
      this.userName = user.userName;
    }, error =>{
      console.log(error);
    })
  }

}
