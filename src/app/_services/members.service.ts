import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../Models/member';
import { updateMember } from '../Models/updateMember';

const httpOptions ={
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl='https://localhost:44325/api/AppUser';
  baseUrlLikes ='https://localhost:44325/api/Likes';

  constructor(private http:HttpClient) { }

  getMembers(){
    //return this.http.get(this.baseUrl, httpOptions);
    return this.http.get<Member[]>(this.baseUrl, httpOptions);
  }

  getMemberDetail(id){
    return this.http.get<Member>(this.baseUrl + '/' + id, httpOptions);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl, member, httpOptions);
  }

  addLike(username:string){
    return (this.http.post(this.baseUrlLikes+ '/' + username,{}, httpOptions));
  }

  getLiked(){
    return (this.http.get<Member[]>(this.baseUrlLikes , httpOptions));
  }

  getLikedBy(){
    return (this.http.get<Member[]>(this.baseUrlLikes + '/userLikedBy', httpOptions));
  }

}
