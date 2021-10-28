import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http:HttpClient) { }

  feedback(data){
    return this.http.post(`https://h-server.herokuapp.com/contact-us/contact`,data);
  }
}
