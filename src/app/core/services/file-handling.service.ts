import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBookInList } from 'src/app/models/book-in-list';
import { IFile } from 'src/app/models/ifile';

const API_URL = '/appdata/kid_ry5t98vKE';

@Injectable({
  providedIn: 'root'
})
export class FileHandlingService {
  file:IFile = {_public:true, _uploadURL:''};
  
  constructor(private http: HttpClient) { }

  addFile(): Observable<IFile> {
    return this.http.post<IFile>(API_URL, this.file);
  }
  //upload after obtaining uploadURl
  uploadFile(id:string, entity: any): Observable<any> {
    return this.http.put<any>(API_URL + '/' + id ,entity);
  }

}
