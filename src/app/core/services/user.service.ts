import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/modules/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/user/kid_ry5t98vKE');
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>('/user/kid_ry5t98vKE/' + id);
  }

  addUser(entity: IUser): Observable<IUser> {
    return this.http.post<IUser>('/user/kid_ry5t98vKE/', entity, { params: { "isBasic": "1" } });
  }

  updateUser(id: string, entity: IUser): Observable<IUser> {
    return this.http.put<IUser>('/user/kid_ry5t98vKE/' + id, entity);
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete<Object>('/user/kid_ry5t98vKE/' + id + '?hard=true');
  }

}