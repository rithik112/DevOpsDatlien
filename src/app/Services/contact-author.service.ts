import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactAuthorService {
  
  constructor(private http:HttpClient) { }

  message(data){
    return this.http.post(`https://h-server.herokuapp.com/contact-agent/contact`,data);
  }

  byYou(email){
    return this.http.get(`https://h-server.herokuapp.com/contact-agent/contact-by-u/${email}`);
      }

  toYou(id){
    return this.http.get(`https://h-server.herokuapp.com/contact-agent/contact-to-u/${id}`);
  }

  accept(data, id) {
    return this.http.patch(`https://h-server.herokuapp.com/contact-agent/update-status/${id}`,data);
  }

  reject(data ,id) {
    return this.http.patch(`https://h-server.herokuapp.com/contact-agent/update-status/${id}`,data);
  }
}
