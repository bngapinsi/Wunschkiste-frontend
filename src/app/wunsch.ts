import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getAll(): Observable<WunschItem[]> {
    return this.http.get<WunschItem[]>(this.apiUrl);
  }

  getOne(id: string): Observable<WunschItem> {
    return this.http.get<WunschItem>(`${this.apiUrl}/${id}`)
  }

  create(wunsch: WunschItem, bild?: File): Observable<WunschItem> {
    const formData = this.buildFormData(wunsch, bild);
    return this.http.post<WunschItem>(this.apiUrl, wunsch);
  }

  update(id: string, wunsch: Partial<WunschItem>, bild?: File): Observable<WunschItem> {
    const formData = this.buildFormData(wunsch, bild);
    return this.http.patch<WunschItem>(`${this.apiUrl}/${id}`, wunsch);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(wunsch: Partial<WunschItem>, bild?: File): FormData {
    const formData = new FormData();
    if (wunsch.titel) formData.append('titel', wunsch.titel);
    if (wunsch.kategorie) formData.append('kategorie', wunsch.kategorie);
    if (wunsch.preis != null) formData.append('preis', String(wunsch.preis));
    if (wunsch.link) formData.append('link', wunsch.link);
    if (wunsch.notiz) formData.append('notiz', wunsch.notiz);
    if (bild) formData.append('bild', bild);
    return formData;
  }


}
