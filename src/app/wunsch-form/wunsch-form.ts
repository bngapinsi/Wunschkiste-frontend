import { Component, inject, OnInit } from '@angular/core';
import { WunschItem, Wunsch } from '../wunsch';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wunsch-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './wunsch-form.html',
  styleUrl: './wunsch-form.css',
})
export class WunschForm implements OnInit{
  wunsch: WunschItem = {
      titel:'',
      kategorie:'',
      preis: 0,
      link:'',
      bildUrl:'',
      notiz:'',
  };

  istBearbeitung = false;
  private wunschId: string | null = null;

  private wunschService = inject(Wunsch);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  ngOnInit(): void {
    this.wunschId = this.route.snapshot.paramMap.get('id');

    if (this.wunschId) {
      this.istBearbeitung = true;
      this.wunschService.getOne(this.wunschId).subscribe({
        next: (data) => this.wunsch = data,
        error: (err) => console.error('Fehler beim Laden:', err)
      })
    }
  }

  speichern(): void {
    if (this.istBearbeitung && this.wunschId) {
      this.wunschService.update(this.wunschId, this.wunsch).subscribe({
        next: () => this.router.navigate(['/wuensche']),
        error: (err) => console.error('Fehler beim Aktualisieren:', err)
      });
    }
    else {
      this.wunschService.create(this.wunsch).subscribe({
        next: () => this.router.navigate(['/wuensche']),
        error: (err) => console.error('fehler beim Anlegen:', err)
      });
    }
  }

}
