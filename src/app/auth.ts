import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private currentName = signal<string>('');
  private currentToken = signal<string>('');
  private currentUsername = signal<string>('');
  private currentRole = signal<string>('');

  getName() {
    return this.currentName;
  }

  loggedIn = () => !!this.currentToken();
  isAdmin = () => this.currentRole() === 'admin';

  //Registrierung: legt einen neuen Nutzer im Backend an
  registrieren(nutzer: Nutzer): Observable<Nutzer>{
   return this.http.post<Nutzer>(`${this.apiUrl}/registrieren`, nutzer);
  }

  //Anmeldung: prüft benutzername und passwort im Backend
  anmelden(benutzername: string, passwort: string): Observable<Nutzer>{
   return this.http.post<Nutzer>(`${this.apiUrl}/anmelden`, {benutzername, passwort});
  }
}
