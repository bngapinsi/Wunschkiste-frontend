import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
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

  private auth = inject(Auth);
  private router = inject(Router);

  modusWechseln(neuerModus: 'anmelden' | 'registrieren'): void {
    this.modus = neuerModus;
    this.fehlerText = '';
  }

  registrieren(): void {
    this.auth.registrieren({
      benutzername: this.neuerBenutzername,
      vorname: this.vorname,
      nachname: this.nachname,
      passwort: this.neuesPasswort
    });
    this.router.navigate(['/wuensche']);
  }

  anmelden(): void {
    const erfolgreich = this.auth.anmelden(this.benutzername, this.passwort);
    if(erfolgreich) {
      this.router.navigate(['/wuensche']);
    }
    else {
      this.fehlerText = 'Benutzername oder Passwort falsch.';
    }
  }
  
}
