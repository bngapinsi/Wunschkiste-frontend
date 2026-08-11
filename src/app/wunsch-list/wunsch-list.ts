import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Wunsch } from '../wunsch';
import { Auth } from '../auth';


@Component({
  selector: 'app-wunsch-list',
  imports: [CommonModule, RouterLink],//CommonModule für *ngFor im Template und RouterLink für den Link zum Formular
  templateUrl: './wunsch-list.html',
  styleUrl: './wunsch-list.css',
})
export class WunschList {
  private wunschService = inject(Wunsch);
  private auth = inject(Auth);

  name = this.auth.getName();
}
