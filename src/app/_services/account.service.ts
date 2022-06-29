import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Models/User';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:44325/api/';

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient,private presence: PresenceService) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response:User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUserSource.next(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'Account/register', model).pipe(
      map((response:User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUserSource.next(user);
          this.presence.createHubConnection(user);
        }
        return user;
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

}
