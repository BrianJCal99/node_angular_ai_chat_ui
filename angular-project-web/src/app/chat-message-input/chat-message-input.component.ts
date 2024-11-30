import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { ChatService } from '../chat-message/chat.service';

@Component({
  selector: 'app-chat-message-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-message-input.component.html',
  styleUrl: './chat-message-input.component.css'
})
export class ChatMessageInputComponent {
  // Initialize FormGroup with 'userInput' control
  userForm = new FormGroup({
    userInput: new FormControl('')
  });

  constructor(private chatService: ChatService) {}

  onSubmit() {
    const message = this.userForm.get('userInput')?.value;
    if (message) {
      this.chatService.sendMessage(message);  // Call service to handle both user and AI messages
      this.userForm.reset();
    }
  }
}
