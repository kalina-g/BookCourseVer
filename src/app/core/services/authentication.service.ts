import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials):Observable<Object> {
    return this.http.post('/user/kid_ry5t98vKE/login', credentials );
  }
}
