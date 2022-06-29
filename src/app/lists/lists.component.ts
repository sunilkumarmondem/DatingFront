import { Component, OnInit } from '@angular/core';
import { Member } from '../Models/member';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  members: Member[];
  
  
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLiked();
    this.loadLikedBy();
  }

  loadLiked() {
    this.memberService.getLiked().subscribe(response => {
      console.log(response);
      this.members = response;
      
    })
  }

  loadLikedBy() {
    this.memberService.getLikedBy().subscribe(response => {
      console.log(response);
      this.members = response;
      
    })
  }

}
