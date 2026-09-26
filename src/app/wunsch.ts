import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from './auth';

export interface WunschItem{
  id?: string;
  titel: string;
  kategorie: string;
  preis: number | null;
  link?: string;
  bildUrl?: string;
  notiz?: string;

}

@Injectable({
  providedIn: 'root',
})

export class Wunsch {
  private apiUrl = 'http://localhost:3000/wuensche';
  private baseUrl = 'http://localhost:3000';
  private auth = inject(Auth);

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({
      authorization: this.auth.token(),
      username: this.auth.user().benutzername
    });
  }

   bildUrl(pfad?: string): string {
    if(!pfad) return '';
    return `${this.baseUrl}${pfad}`;
  }

  getAll(): Observable<WunschItem[]> {
    return this.http.get<WunschItem[]>(this.apiUrl, { headers: this.headers()});
  }

  getOne(id: string): Observable<WunschItem> {
    return this.http.get<WunschItem>(`${this.apiUrl}/${id}`, { headers: this.headers()});
  }

  create(wunsch: WunschItem, bild?: File): Observable<WunschItem> {
    const formData = this.buildFormData(wunsch, bild);
    return this.http.post<WunschItem>(this.apiUrl, formData, { headers: this.headers()});
  }

  update(id: string, wunsch: Partial<WunschItem>, bild?: File): Observable<WunschItem> {
    const formData = this.buildFormData(wunsch, bild);
    return this.http.patch<WunschItem>(`${this.apiUrl}/${id}`, formData, { headers: this.headers()});
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers()});
  }

  private buildFormData(wunsch: Partial<WunschItem>, bild?: File): FormData {
    const formData = new FormData();
    if (wunsch.titel) formData.append('titel', wunsch.titel);
    if (wunsch.kategorie) formData.append('kategorie', wunsch.kategorie);
    if (wunsch.preis != null) formData.append('preis', String(wunsch.preis));
    if (wunsch.link) formData.append('link', wunsch.link);
    if (wunsch.notiz) formData.append('notiz', wunsch.notiz ?? '');
    if (bild) formData.append('bild', bild);
    return formData;
  }


}
