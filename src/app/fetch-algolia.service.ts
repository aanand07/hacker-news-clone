import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchAlgoliaService {
  url = `https://hn.algolia.com/api/v1/search?page=`;
  constructor(private http: HttpClient) { }

  getData(page = 0) {
    return this.http.get(`${this.url}${page}`);
  }
}
