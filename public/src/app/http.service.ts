import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  allPost() {
    return this._http.get('/users');
  }

  newUser(data){
    return this._http.post('/users/new', data);
  } 
  
  createPost(username, data: any) {
    return this._http.put(`/users/post/${username}`, data);
  }

  getUserByUsername(data: any){
    console.log("Service ", data)
    return this._http.post('/users/login', data);
  }
}

