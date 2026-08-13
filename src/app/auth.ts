import { Injectable, signal } from '@angular/core';
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
  //simuliert eine Datenbank der registrierten Nuztzer - nur im Brwoser - Speicher
  private nutzerListe: Nutzer[] = [];

  private currentName = signal<string>('');

  getName() {
    return this.currentName;
  }

  //Registrierung: lrigt einen neuen Nutzer an und merkt sich sofort den Vornamen
  registrieren(nutzer: Nutzer): void {
    this.nutzerListe.push(nutzer);
    this.currentName.set(nutzer.vorname);
  }

  //Anmeldung:sucht den Nutzer per Benutzername, gibt true/false zurück
  anmelden(benutzername: string, passwort: string): boolean {
    const gefunden = this.nutzerListe.find(
      n => n.benutzername === benutzername && n.passwort === passwort
    );
    if (gefunden) {
      this.currentName.set(gefunden.vorname);
      return true;
    }
    return false;
  }
}
