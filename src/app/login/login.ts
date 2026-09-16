import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Confirm } from '../confirm/confirm';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, Confirm],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //steuert welches Formular angezeigt wird
  modus: 'anmelden' | 'registrieren' = 'anmelden';
  //Formular für die Anmeldung
  benutzername = '';
  passwort = '';
  //Formular für die Registstrierung
  vorname = '';
  nachname = '';
  neuerBenutzername = '';
  neuesPasswort = '';

  fehlerText = '';

  dialogSichtbar = false;
  dialogHeadline = '';
  dialogInfo = '';

  private auth = inject(Auth);
  private router = inject(Router);

  openDialog(headline: string, info: string): void {
    this.dialogHeadline = headline;
    this.dialogInfo = info;
    this.dialogSichtbar = true;
  }

  closeDialog(): void {
    this.dialogSichtbar = false;
  }

  modusWechseln(neuerModus: 'anmelden' | 'registrieren'): void {
    this.modus = neuerModus;
    this.fehlerText = '';
  }

  validRegistrieren(): boolean {
    const check = 
    !!this.vorname && !!this.nachname && !!this.neuerBenutzername && this.neuesPasswort.length >= 8;
    return check;
  }

  validAnmelden(): boolean {
    const check = 
    !!this.benutzername && !!this.passwort;
    return check;
  }

  registrieren(): void {
    if (!this.validRegistrieren()) {
      this.fehlerText = 'Bitte alle Felder ausfüllen. Passwort muss mind. 8 Zeichen haben.';
      return;
    }
    this.auth.registrieren({
      benutzername: this.neuerBenutzername,
      vorname: this.vorname,
      nachname: this.nachname,
      passwort: this.neuesPasswort
    }).subscribe({
      next: () => {
      this.openDialog ('Erfolg', 'Registrierung erfolgreich, bitte anmelden');
      this.modus = 'anmelden';
      },
      error: () => {
        this.openDialog ('Fehler', 'Registrierung fehlgeschlagen.')
      }
    })
    
  }

  anmelden(): void {
    if (!this.validAnmelden()) {
      this.fehlerText = 'Bitte Benutzername und Passwort eingeben.';
      return;
    }
    this.auth.anmelden({benutzername: this.benutzername, passwort: this.passwort}).subscribe({
      next: (response: any) => {
        this.auth.setUser(response.token, response.user);
        this.router.navigate(['/wuensche']);
      },
      error: () => {
        this.fehlerText = 'Benutzername oder Passwort falsch.';
      }
    });
  }
  
}
