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
  user: WritableSignal<Nutzer> = signal(this.ladeUser());
  token: WritableSignal<string> = signal(localStorage.getItem('token') ?? '');
  loggedIn: Signal<boolean> = computed(() => this.user().id != '0' || false);
  name: Signal<string> = computed(() => this.user().vorname);

  constructor(private http: HttpClient) {}

  private ladeUser(): Nutzer {
    const gespeichert = localStorage.getItem('user');
    return gespeichert ? JSON.parse(gespeichert) : { id: '0', benutzername: '', passwort: '', vorname: '', nachname: ''};
  }

  setUser(token: string, user: Nutzer) {
    this.user.set(user);
    this.token.set(token);
    localStorage.setItem('user', JSON.stringify(user)); //für Reload merken
    localStorage.setItem('token', token)
  }
  

  unsetUser(): void {
    this.user.set({ id: '0', benutzername: '', passwort: '', vorname: '', nachname: ''});
    this.token.set('');
    localStorage.removeItem('user'); //beim Logout wieder
    localStorage.removeItem('token');

  }

  registrieren(nutzer: Nutzer): Observable<any> {
    return this.http.post(this.baseUrl + '/registrieren', nutzer);
  }

  anmelden(nutzer: { benutzername: string; passwort: string; }): Observable<any> {
    return this.http.post(this.baseUrl + '/anmelden', nutzer);
  }
}
