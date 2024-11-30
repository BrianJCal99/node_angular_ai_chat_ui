import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatMessageItem } from '../chat-message/chatMessageInterface.model';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatService } from '../chat-message/chat.service';

@Component({
  selector: 'app-chat-message-list',
  standalone: true,
  imports: [ChatMessageComponent],
  templateUrl: './chat-message-list.component.html',
  styleUrl: './chat-message-list.component.css'
})

export class ChatMessageListComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  messageList: ChatMessageItem[] = [];  // Local variable to store the history data
  isloading: boolean = true;      // Loading state to show progress

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.loadHistory().subscribe({
      next: (response) => {
        this.messageList = response.history;
        this.isloading = false;
      },
      error: (err) => {
        console.error('Error loading history:', err);
        this.isloading = false;
      }
    });

    // Listen for both user and AI messages
    this.chatService.newMessage$.subscribe((newMessage) => {
      this.messageList.push(newMessage);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
