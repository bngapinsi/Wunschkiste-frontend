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
  vorname = '';

  private auth = inject(Auth);
  private router = inject(Router);

  registrieren(): void{
    this.auth.setName(this.vorname);
    this.router.navigate(['/wuensche']);
  }
}
