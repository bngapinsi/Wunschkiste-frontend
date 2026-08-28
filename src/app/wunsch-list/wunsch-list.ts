import { CommonModule} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Wunsch, WunschItem } from '../wunsch';
import { Auth } from '../auth';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-wunsch-list',
  imports: [CommonModule, RouterLink, FormsModule],//CommonModule für *ngFor im Template und RouterLink für den Link zum Formular
  templateUrl: './wunsch-list.html',
  styleUrl: './wunsch-list.css',
})
export class WunschList implements OnInit{
  wuensche: WunschItem[] = [];

  suchbegriff = '';

  ausgewaehlteKategorie = 'Alle';

  private wunschService = inject(Wunsch);
  private auth = inject(Auth);

  name = this.auth.getName();

  ngOnInit(): void {
    this.wunschService.getAll().subscribe({
      next: (data) => this.wuensche = data,
      error: (err) => console.error('Fehler beim Laden der Wünsche: ', err)
    });
  }

  get kategorie(): string[] {
    const vorhandene = Array.from(new Set(this.wuensche.map(w => w.kategorie).filter(k => !!k)));
    return ['Alle', ...vorhandene];
  }

  get gefilterteWuensche(): WunschItem[] {
    return this.wuensche.filter(wunsch => {
      const passtKategorie = this.ausgewaehlteKategorie === 'Alle' || wunsch.kategorie === this.ausgewaehlteKategorie;

      const passtSuche = wunsch.titel.toLowerCase().includes(this.suchbegriff.toLowerCase());

      return passtKategorie && passtSuche;
    });
  }

  kategorieWaehlen(kategorie: string): void {
    this.ausgewaehlteKategorie = kategorie;
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
