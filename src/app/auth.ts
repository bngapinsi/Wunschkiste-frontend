import { HttpClient} from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
//Struktur eines registrierten Nutzers

export interface Nutzer{
  id?: string;
  benutzername: string;
  vorname: string;
  nachname: string;
  passwort: string;
  
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  baseUrl = 'http://localhost:3000';
  user: WritableSignal<Nutzer> = signal({ id: '0', benutzername: '', passwort: '', vorname: '', nachname: '', role: ''});
  token: WritableSignal<string> = signal('');
  loggedIn: Signal<boolean> = computed(() => this.user().id != '0' || false);
  name: Signal<string> = computed(() => this.user().vorname);

  constructor(private http: HttpClient) {}

  setUser(token: string, user: Nutzer) {
    this.user.set(user);
    this.token.set(token);
  }
  

  unsetUser(): void {
    this.user.set({ id: '0', benutzername: '', passwort: '', vorname: '', nachname: ''});
    this.token.set('');
  }

  registrieren(nutzer: Nutzer): Observable<any> {
    return this.http.post(this.baseUrl + '/registrieren', nutzer);
  }

  anmelden(nutzer: { benutzername: string; passwort: string; }): Observable<any> {
    return this.http.post(this.baseUrl + '/anmelden', nutzer);
  }
}
