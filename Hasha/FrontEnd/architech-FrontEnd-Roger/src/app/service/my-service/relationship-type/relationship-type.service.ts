import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseServiceService } from '../base-service/base-service.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RelationshipTypeService extends BaseServiceService {

  constructor(
    private http :HttpClient
  ) {
    super('relationshipType');
   }
  getAll(): Observable<any>{
    return this.http.get(this.action('getAll'), this.httpOptions);
  }
  getById(id): Observable<any>{
    return this.http.get(this.action('getById') + id, this.httpOptions);
  }
  createRelationshipType(data): Observable<any>{
    return this.http.post(this.action('createRelationshipType'), data, this.httpOptions);
  }
  updateRelationshipType(data): Observable<any>{
    return this.http.post(this.action('updateRelationshipType') + data.relationshipType.id, data, this.httpOptions);
  }
  deleteRelationshipType(id): Observable<any>{
    return this.http.post(this.action('deleteRelationshipType') + id,{}, this.httpOptions);
  }
  deleteRelationshipTypes(ids): Observable<any>{
    return this.http.post(this.action('deleteRelationshipTypes'),{data: ids}, this.httpOptions);
  }
  getAttribute(id): Observable<any>{
    return this.http.get(this.action('getAttribute') +id, this.httpOptions);
  }
}
