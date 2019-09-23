import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book';

const API_URL = '/appdata/kid_ry5t98vKE/books/';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  
  getBooks(sortParam=''): Observable<IBook[]> {
    return this.http.get<IBook[]>(API_URL + sortParam);
  }

  getBook(id: string): Observable<IBook> {
    return this.http.get<IBook>(API_URL + id, {params:{"isBasic":"2"}} );
  }

  addBook(entity: IBook): Observable<IBook> {
    return this.http.post<IBook>(API_URL, entity);
  }

  updateBook(id:string, entity: IBook): Observable<IBook> {
    return this.http.put<IBook>(API_URL + id ,entity);
  }

  deleteBook(id: string): Observable<Object> {
    return this.http.delete<Object>(API_URL + id + '?hard=true');
  }
 
}