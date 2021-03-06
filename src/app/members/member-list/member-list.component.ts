import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Models/member';


import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  p:any;
  filterTerm!: string;
 

  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe(members =>{
      this.members=members;
      console.log(members);
    }, error  =>{
      console.log(error);
    })
  }

}
