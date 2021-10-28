import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/Services/properties.service';

@Component({
  selector: 'app-villas',
  templateUrl: './villas.component.html',
  styleUrls: ['./villas.component.scss']
})
export class VillasComponent implements OnInit {

  pro = []
  len
  prop = []
  name

  constructor(private _propertyService: PropertiesService,
    private _router: Router) { }

  ngOnInit() {
    this._propertyService.getVillas()
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
