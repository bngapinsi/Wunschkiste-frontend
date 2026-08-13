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
  wunsch: WunschItem = { //Startobjekt
      titel:'',
      kategorie:'',
      preis: null,
      link:'',
      bildUrl:'',
      notiz:'',
  };

  istBearbeitung = false;
  private wunschId: string | null = null; //speichert ID: entweder Text ID oder leer(null)

  private wunschService = inject(Wunsch);
  private route = inject(ActivatedRoute); //Zugriff auf information über aktuelle Adresse im Browser(um id aus URL auszulesen)
  private router = inject(Router);


  ngOnInit(): void {
    this.wunschId = this.route.snapshot.paramMap.get('id'); //schaut in die Webadresse

    if (this.wunschId) {
      this.istBearbeitung = true;
      this.wunschService.getOne(this.wunschId).subscribe({
        next: (data) => this.wunsch = data,
        error: (err) => console.error('Fehler beim Laden:', err)
      })
    }
  }

  speichern(): void {

    if(this.wunsch.preis === 0) {
      this.wunsch.preis = 0;
    }
     
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
