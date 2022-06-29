import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/message';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  container = 'Inbox';

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
   
    this.messageService.getMessages( this.container).subscribe(response => {
      this.messages = response;
     
    })
  }

}
