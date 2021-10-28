import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http:HttpClient) { }

  private _getProperty = "https://h-server.herokuapp.com/property/properties/";
  private _getSProperty = "https://h-server.herokuapp.com/property/s-properties/";
  private _getSPropertyCount = "https://h-server.herokuapp.com/property/s-pro-count/";

  private _getDuplex = "https://h-server.herokuapp.com/property/duplex";
  private _getVilla = "https://h-server.herokuapp.com/property/villas";
  private _getCommercial = "https://h-server.herokuapp.com/property/coms";
  private _getApartment = "https://h-server.herokuapp.com/property/apartments";
  private _getResidential = "https://h-server.herokuapp.com/property/resi";
  private _getBeachHouse = "https://h-server.herokuapp.com/property/b-house";

    property(data) {
      return this.http.post(`https://h-server.herokuapp.com/property/properties/`,data);
    }
  
  getProperties() {
    return this.http.get<any>(this._getProperty)
  }
  getSProperties(id) {
    return this.http.get<any>(this._getSProperty + id)
  }
  getSPropertiesCount(id) {
    return this.http.get<any>(this._getSPropertyCount + id)
  }
  getSearchProperties(title) {
    return this.http.get<any>(this._getProperty + title)
  }


  getDuplex() {
    return this.http.get<any>(this._getDuplex)
  }
  getVillas() {
    return this.http.get<any>(this._getVilla)
  }
  getApartments() {
    return this.http.get<any>(this._getApartment)
  }
  getBeachHouse() {
    return this.http.get<any>(this._getBeachHouse)
  }
  getResidential() {
    return this.http.get<any>(this._getResidential)
  }
  getCommercial() {
    return this.http.get<any>(this._getCommercial)
  }

  deleteProperty(SPro){
    return this.http.delete(`https://h-server.herokuapp.com/property/remove/${SPro.userid}/${SPro.propertyId}`);
  }

  clearAll(id){
    return this.http.delete(`https://h-server.herokuapp.com/property/removeAll/${id}`);
  }
}