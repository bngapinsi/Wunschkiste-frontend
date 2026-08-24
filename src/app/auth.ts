import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
//Struktur eines registrierten Nutzers

export interface Nutzer{
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

  getName() {
    return this.currentName;
  }

  //Registrierung: legt einen neuen Nutzer im Backend an
  registrieren(nutzer: Nutzer): Observable<Nutzer>{
   return this.http.post<Nutzer>(`${this.apiUrl}/registrieren`, nutzer);
  }

  //Anmeldung: prüft benutzername und passwort im Backend
  anmelden(benutzername: string, passwort: string): Observable<Nutzer>{
   return this.http.post<Nutzer>(`${this.apiUrl}/anmelden`, {benutzername, passwort});
  }
}
