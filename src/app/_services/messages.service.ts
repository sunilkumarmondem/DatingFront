import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../Models/message';

const httpOptions ={
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
  })
}

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  baseUrlMessage ='https://localhost:44325/api/Messages';

  constructor(private http:HttpClient) { }

  getMessages(container) {
    return this.http.get<Message[]>(this.baseUrlMessage + '?Username=lisa&Container=' + container, httpOptions);
  }

}
