import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResource } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_PREFIX = '/api/account/';

  constructor(private http: HttpClient) { }

  getList(): Observable<IUserResource[]> {
    return this.http.get<IUserResource[]>(this.URL_PREFIX);
  }

}
