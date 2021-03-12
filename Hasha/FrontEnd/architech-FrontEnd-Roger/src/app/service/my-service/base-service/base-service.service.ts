import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

    private _url;
    private _table;
    protected jwtToken; 

    constructor(table){
        this._table = table;
        if(environment.url.slice(-1) == '/'){
            this._url = environment.url + table;
        }
        else{
            this._url = environment.url + '/' + table;
        }
        
        let token = localStorage.getItem("token");
        if(token != null){
            this.jwtToken = token;
        }
    }

    public getUrl(){
        return this._url;
    }
    
    public getTable(){
        return this._table;
    }

    protected get httpLoginOptions() {
        return {
            
            observe: 'response'
        }
    }

    protected get httpOptions(){
        return{
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization': `${localStorage.getItem("token")}`
            })
        }
    }

    protected get httpSignupOptions(){
        return{
            headers: new HttpHeaders({
                'Content-Type':'application/json',
            })
        }
    }

    protected get FormData(){
        return{
            headers: new HttpHeaders({
                'Content-Type': 'multipart/from-data',
                'Authorization': `${localStorage.getItem("token")}`,
            })
        }
    }

    protected action(...str){
        return this._url + "/" + str + "/";
    }
}
