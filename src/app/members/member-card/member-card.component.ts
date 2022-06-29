import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/Models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() member:Member;
  constructor(private memberService:MembersService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  addmyLike(member:Member){
    this.memberService.addLike(member.userName).subscribe(() => {
      this.toastrService.success('You have liked ' + member.knownAs);
    })
  }

}
