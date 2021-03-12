import { Injectable } from '@angular/core';
import { BaseServiceService } from '../base-service/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ObjectService extends BaseServiceService{

  constructor( private http: HttpClient) {
    super("object");
   }

  getAll(value): Observable<any>{
    return this.http.post(this.action('getAll'), { keySearch:value }, this.httpOptions);
  }
  getById(id): Observable<any>{
    return this.http.get(this.action('getById') + id, this.httpOptions);
  }
  createObject(data): Observable<any>{
    return this.http.post(this.action('createObject'), data, this.httpOptions);
  }
  updateObject(data): Observable<any>{
    return this.http.post(this.action('updateObject') + data.id, data, this.httpOptions);
  }
  deleteObject(id): Observable<any>{
    return this.http.post(this.action('deleteObject') + id,{}, this.httpOptions);
  }
  deleteObjects(ids): Observable<any>{
    return this.http.post(this.action('deleteObjects'),{data:ids}, this.httpOptions);
  }
  updateAttribueValue(data): Observable<any>{
    return this.http.post(this.action("updateAttribueValue"), data, this.httpOptions);
  }
  updateName(data): Observable<any>{
    return this.http.post(this.action("updateName"), data, this.httpOptions);
  }
  searchObject(value) : Observable<any>{
    return this.http.post(this.action("searchObject"), { keySearch:value }, this.httpOptions);
  }
  update(data): Observable<any>{
    return this.http.post(this.action("updateObject")+data.object.id, data, this.httpOptions);
  }
  getByType(id): Observable<any>{
    return this.http.get(this.action("getByType/" + id), this.httpOptions);
  }
  getByCombinationsFrom(id): Observable<any>{
    return this.http.get(this.action("getByCombinationsFrom/" +id), this.httpOptions);
  }
  getByCombinationsTo(idReType,IdToObjType): Observable<any>{
    return this.http.get(this.action("getByCombinationsTo/" + idReType + "/" + IdToObjType), this.httpOptions);
  }
  showMoreChildren(id, paId): Observable<any>{
    return this.http.get(this.action("showMoreChildren/" + id ), this.httpOptions);
  }
  showMoreParent(id,paId): Observable<any>{
    return this.http.get(this.action("showMoreParent/" + id), this.httpOptions);
  }
}
