import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  message!: string;
  messages: string[] = []

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessage().pipe(throttleTime(1000)).subscribe((message:any)=>this.pushMessage(message))
  }

  sendMessage() {
    this.pushMessage(this.message)
    this.chatService.sendMessage(this.message)
    this.message = ''
  }

  pushMessage(message:string) {
    let messageWithTimeStamp = `${Date.now()} : ${message}`
    this.messages.push(messageWithTimeStamp)
  }
}
