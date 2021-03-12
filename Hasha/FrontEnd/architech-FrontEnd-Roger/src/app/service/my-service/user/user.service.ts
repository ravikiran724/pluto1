import { Injectable } from '@angular/core';
import { BaseServiceService } from '../base-service/base-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseServiceService{

  constructor( private http: HttpClient ) { 
    super("user")
  }

  getAll(): Observable<any>{
    return this.http.get(this.action('getAll'), this.httpOptions);
  }
  getById(id): Observable<any>{
    return this.http.get(this.action('getById') + id, this.httpOptions);
  }
  createUser(data): Observable<any>{
    return this.http.post(this.action('createUser'), data, this.httpOptions);
  }
  register(data): Observable<any>{
    return this.http.post(environment.url + 'user/register', data, {});
  }
  updateUser(data): Observable<any>{
    return this.http.post(this.action('updateUser') + data.id, data, this.httpOptions);
  }
  deleteUser(id): Observable<any>{
    return this.http.post(this.action('deleteUser') + id,{}, this.httpOptions);
  }
  deleteUsers(ids): Observable<any>{
    return this.http.post(this.action('deleteUsers'),{data: ids}, this.httpOptions);
  }
  getAttribute(id): Observable<any>{
    return this.http.get(this.action('getAttribute') +id, this.httpOptions);
  }

  login(data){
    return this.http.post(environment.url+'login', data,{ observe: 'response'});
  }
}
