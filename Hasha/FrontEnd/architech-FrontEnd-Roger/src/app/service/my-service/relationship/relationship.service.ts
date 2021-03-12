import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseServiceService } from '../base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService extends BaseServiceService {

  constructor( private http: HttpClient) { 
    super('relationship')
  }

  getAll(): Observable<any>{
    return this.http.get(this.action('getAll'), this.httpOptions);
  }
  getById(id): Observable<any>{
    return this.http.get(this.action('getById') + id, this.httpOptions);
  }
  createRelationship(data): Observable<any>{
    return this.http.post(this.action('createRelationship'), data, this.httpOptions);
  }
  updateRelationship(data): Observable<any>{
    console.log(data);
    return this.http.post(this.action('updateRelationship')+data.id, data, this.httpOptions);
  }
  deleteRelationship(id): Observable<any>{
    return this.http.post(this.action('deleteRelationship') + id,{}, this.httpOptions);
  }
  deleteRelationships(ids): Observable<any>{
    return this.http.post(this.action('deleteRelationships'),{data: ids}, this.httpOptions);
  }
}
