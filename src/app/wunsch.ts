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

  create(wunsch: WunschItem): Observable<WunschItem> {
    return this.http.post<WunschItem>(this.apiUrl, wunsch);
  }

  update(id: string, wunsch: Partial<WunschItem>): Observable<WunschItem> {
    return this.http.patch<WunschItem>(`${this.apiUrl}/${id}`, wunsch);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
