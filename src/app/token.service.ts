import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokens: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  addToken(token: string) {
    const currentTokens = this.tokens.value;
    currentTokens.push(token);
    this.tokens.next(currentTokens);
  }

  getTokens(): Observable<string[]> {
    return this.tokens.asObservable();
  }

}
