import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from '../Services/properties.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {

  prop = []
  pro = []
  len
  search
  name
  maxp
  minp



  imgPaths = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg",
    "26.jpg",
    "27.jpg",
    "28.jpg",
    "29.jpg",
    "30.jpg",
  ]

  min = 0;
  max = 29;
  xc
  impath
  constructor(private _propertyService: PropertiesService,
    private _router: Router) { }

  ngOnInit() {
    this._propertyService.getProperties()
      .subscribe(
        res => {
          this.pro = res
          this.prop = res
          console.log(this.pro)
          this.len = this.pro.length
        },  
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
    )
    
  this.xc = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

  this.impath = this.imgPaths[this.xc];
  console.log(this.impath)
  }
  rndm() {
  this.xc = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

  this.impath = this.imgPaths[this.xc];
}
  Search(){
    if(this.name != ""){
      this.pro = this.prop.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
      console.log(this.pro);
      this.len = this.pro.length;
    }
    else if(this.name == ""){
     this.ngOnInit();
    }
  }

  Maxp(){
    if(this.maxp != ""){
      this.pro = this.prop.filter(res=>{
        return res.price(Number(this.maxp))
      });
      console.log(this.pro);
      this.len = this.pro.length;
    }
    else if(this.maxp == ""){
     this.ngOnInit();
    }
  }

  Minp(){
    if(this.minp != ""){
      this.pro = this.prop.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
      console.log(this.pro);
      this.len = this.pro.length;
    }
    else if(this.minp == ""){
     this.ngOnInit();
    }
  }

  ClearAll(){
    this.name = ""
    this.maxp = ""
    this.minp = ""
    this.ngOnInit()
  }
}
