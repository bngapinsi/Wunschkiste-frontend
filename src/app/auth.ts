import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentName = signal<string>('');

  setName(name: string): void{
    this.currentName.set(name);
  }

  getName() {
    return this.currentName;
  }
}
