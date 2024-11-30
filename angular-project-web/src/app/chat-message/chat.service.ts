import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ChatMessageItem } from './chatMessageInterface.model';
import uniqid from 'uniqid';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private newMessageSubject = new Subject<ChatMessageItem>();
  newMessage$ = this.newMessageSubject.asObservable();

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    // Add user message to history and trigger the stream
    const userMessage: ChatMessageItem = { _id: uniqid(), role: 'user', content: message };
    this.newMessageSubject.next(userMessage);

    // Send the message to the backend and process AI response
    this.http.post<{ response: string }>('http://localhost:4000/api/data', { info: message }).subscribe({
      next: (response) => {
        const aiMessage: ChatMessageItem = { _id: uniqid(), role: 'assistant', content: response.response };
        this.newMessageSubject.next(aiMessage);  // Add AI message to the stream
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  loadHistory() {
    return this.http.get<{ history: ChatMessageItem[] }>('http://localhost:4000/api/history');
  }
}
