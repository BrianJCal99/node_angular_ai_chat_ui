import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatMessageListComponent } from "./chat-message-list/chat-message-list.component";
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { ChatMessageInputComponent } from "./chat-message-input/chat-message-input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatMessageListComponent, ChatHeaderComponent, ChatMessageInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Chat App'

}