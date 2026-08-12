import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Wunsch, WunschItem } from '../wunsch';
import { Auth } from '../auth';


@Component({
  selector: 'app-wunsch-list',
  imports: [CommonModule, RouterLink],//CommonModule für *ngFor im Template und RouterLink für den Link zum Formular
  templateUrl: './wunsch-list.html',
  styleUrl: './wunsch-list.css',
})
export class WunschList implements OnInit{
  wuensche: WunschItem[] = [];

  private wunschService = inject(Wunsch);
  private auth = inject(Auth);

  name = this.auth.getName();

  ngOnInit(): void {
    this.wunschService.getAll().subscribe({
      next: (data) => this.wuensche = data,
      error: (err) => console.error('Fehler beim Laden der Wünsche: ', err)
    });
  }

  loeschen(_id: string): void {
    this.wunschService.delete(_id).subscribe({
      next: () => {
        this.wuensche = this.wuensche.filter(w => w.id !== _id )
      },
      error: (err) => console.error('Fehler beim Löschen:', err)
    })
  }

  
}
