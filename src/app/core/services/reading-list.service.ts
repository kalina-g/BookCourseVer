import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBookInList } from 'src/app/models/book-in-list';
import { map } from 'rxjs/operators';

const API_URL = '/appdata/kid_ry5t98vKE/readingList';
const query = '?query='
@Injectable({
  providedIn: 'root'
})
export class ReadingListService {

  constructor(private http: HttpClient) { }


  getBooks(userId: string): Observable<IBookInList[]> {
    return this.http.get<IBookInList[]>(API_URL + query + `{"userId":"${userId}"}`).pipe(
      map(result => result.sort(x => x.isRead ? 1 : -1))
    );
  }

  getLatestNBooks(n: number): Observable<IBookInList[]> {
    return this.http.get<IBookInList[]>(API_URL + `limit=${n}`);
  }

  addBook(entity: IBookInList): Observable<IBookInList> {
    return this.http.post<IBookInList>(API_URL, entity);
  }

  updateBook(id: string, entity: any): Observable<IBookInList> {
    return this.http.put<IBookInList>(API_URL + '/' + id, entity);
  }

  deleteFromReadingList(id: string): Observable<Object> {
    return this.http.delete<Object>(API_URL + '/' + id);
  }

}
