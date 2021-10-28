import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../Services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  applen
  comlen
  villen
  reslen
  bhlen
  duplen

  constructor(private _propertyService: PropertiesService,
    private _router: Router) { }

  ngOnInit() {
    this._propertyService.getApartments()
    .subscribe(
      res => {
        this.applen = res.length
    })

    this._propertyService.getCommercial()
    .subscribe(
      res => {
        this.comlen = res.length
    })

    this._propertyService.getVillas()
    .subscribe(
      res => {
        this.villen = res.length
    })

    this._propertyService.getResidential()
    .subscribe(
      res => {
        this.reslen = res.length
    })

    this._propertyService.getDuplex()
    .subscribe(
      res => {
        this.duplen = res.length
    })

    this._propertyService.getBeachHouse()
    .subscribe(
      res => {
        this.bhlen = res.length
    })

  }
}
