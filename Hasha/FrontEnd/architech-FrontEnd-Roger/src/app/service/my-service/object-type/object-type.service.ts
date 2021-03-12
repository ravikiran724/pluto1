import { Injectable } from '@angular/core';
import { BaseServiceService } from '../base-service/base-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjectTypeService extends BaseServiceService {

  constructor(
    private http :HttpClient
  ) {
    super('objectType');
   }
  getAll(): Observable<any>{
    return this.http.get(this.action('getAll'), this.httpOptions);
  }
  getById(id): Observable<any>{
    return this.http.get(this.action('getById') + id, this.httpOptions);
  }
  createObjectType(data): Observable<any>{
    return this.http.post(this.action('createObjectType'), data, this.httpOptions);
  }
  updateObjectType(data): Observable<any>{
    return this.http.post(this.action('updateObjectType') + data.id, data, this.httpOptions);
  }
  deleteObjectType(id): Observable<any>{
    return this.http.post(this.action('deleteObjectType') + id,{}, this.httpOptions);
  }
  deleteObjectTypes(ids): Observable<any>{
    return this.http.post(this.action('deleteObjectTypes'),{data: ids}, this.httpOptions);
  }
  getAttribute(id): Observable<any>{
    return this.http.get(this.action('getAttribute') +id, this.httpOptions);
  }
}
