import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedPropertiesService {

  constructor(private http:HttpClient) { }

  addCart(SPro){
    return this.http.post(`https://h-server.herokuapp.com/sproperty/add`,SPro);
  }

  getCart(UserId){
    return this.http.get(`https://h-server.herokuapp.com/sproperty/get/${UserId}`);
  }

  deleteProduct(SPro){
    return this.http.delete(`https://h-server.herokuapp.com/sproperty/remove/${SPro.userid}/${SPro.propertyId}`);
  }

  clearCart(id){
    return this.http.delete(`https://h-server.herokuapp.com/sproperty/removeAll/${id}`);
  }
}
