import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/Services/properties.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss']
})
export class CommercialComponent implements OnInit {

  pro = []
  len
  prop = []
  name

  constructor(private _propertyService: PropertiesService,
    private _router: Router) { }

  ngOnInit() {
    this._propertyService.getCommercial()
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

  ClearAll(){
    this.name = ""
    this.ngOnInit()
  }

}
