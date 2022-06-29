import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/Models/member';
import { updateMember } from 'src/app/Models/updateMember';
import { User } from 'src/app/Models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member:Member;
  user: User;
  updatedmember:updateMember;

  constructor(private accountService:AccountService, private memberService:MembersService,
    private toastrService:ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMemberDetail(this.user.id).subscribe(member =>{
      this.member=member;
      console.log(this.member);
    })
  }

  updateProfile(){
    this.memberService.updateMember(this.member).subscribe(() =>{
      console.log(this.updatedmember);
      this.toastrService.success('Profile Updated Successfully!');
    })
   
  }

}
