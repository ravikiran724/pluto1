import { Injectable } from '@angular/core';
import { BaseServiceService } from '../base-service/base-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributeTypeService extends BaseServiceService{

  constructor( private http: HttpClient) { 
    super('attributeType')
  }

  getAll(): Observable<any>{
    return this.http.get(this.action('getAll'), this.httpOptions);
  }
  getById(id): Observable<any>{
    return this.http.get(this.action('getById') + id, this.httpOptions);
  }
  createAttributeType(data): Observable<any>{
    return this.http.post(this.action('createAttributeType'), data, this.httpOptions);
  }
  updateAttributeType(data): Observable<any>{
    return this.http.post(this.action('updateAttributeType') + data.id, data, this.httpOptions);
  }
  deleteAttributeType(id): Observable<any>{
    return this.http.post(this.action('deleteAttributeType') + id,{}, this.httpOptions);
  }
  deleteAttributeTypes(arr): Observable<any>{
    return this.http.post(this.action('deleteAttributeTypes'),{ data: arr}, this.httpOptions);
  }
}
