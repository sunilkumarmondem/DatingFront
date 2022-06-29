import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/message';
import { MessagesService } from '../_services/messages.service';

@Component({
  selector: 'app-out-boxmessages',
  templateUrl: './out-boxmessages.component.html',
  styleUrls: ['./out-boxmessages.component.css']
})
export class OutBoxmessagesComponent implements OnInit {
  messages: Message[] = [];
  container = 'Outbox';

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  loadMessages() {
   
    this.messageService.getMessages( this.container).subscribe(response => {
      this.messages = response;
     
    })
  }

}
