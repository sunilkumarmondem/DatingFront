import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})

export class PresenceService {
  hubUrl='https://localhost:5001/hubs/';
  private hubConnection: HubConnection;

 

  constructor(private toastr: ToastrService) { }
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:44325/hubs/presence", {
        //skipNegotiation: true,
      //transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection
      .start()
      .catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.toastr.info(username+ 'has connected');
      // this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
      //   this.onlineUsersSource.next([...usernames, username])
      // })
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.toastr.info(username+ 'has disconnected');
      // this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
      //   this.onlineUsersSource.next([...usernames.filter(x => x !== username)])
      // })
    })

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      // this.onlineUsersSource.next(usernames);
    })

    // this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
    //   this.toastr.info(knownAs + ' has sent you a new message!')
    //     .onTap
    //     .pipe(take(1))
    //     .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'));
    // })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(error => console.log(error));
  }



}
