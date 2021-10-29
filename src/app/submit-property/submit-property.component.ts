import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Services/auth.service';
import { NotifierService } from '../Services/notifier.service';
import { PropertiesService } from '../Services/properties.service'

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-submit-property',
  templateUrl: './submit-property.component.html',
  styleUrls: ['./submit-property.component.scss']
})
export class SubmitPropertyComponent implements OnInit {

  lat: string = '';
  lng: string = '';

  constructor(public _authService: AuthService, private _router: Router, private noti: NotifierService, private propertiesService: PropertiesService) { }
  UserId

mapa: Mapboxgl.Map;

  ngOnInit( ): void {
    if(this._authService.loggedIn()){
      this._authService.getUserId().subscribe((data)=>{
        this.UserId=data
        this._authService.getUserName(this.UserId).subscribe((name)=>{
          this.submitPropertyFormData.author.setValue(name)
        })
        this._authService.getUserEmail(this.UserId).subscribe((mail)=>{
          this.submitPropertyFormData.author_mail.setValue(mail)
        })
      }) 
    }
// 
    (Mapboxgl as any).accessToken = 'pk.eyJ1Ijoicml0aGlrMTEyIiwiYSI6ImNrcTRkbGh4azAwMTQydnNkMjNyZGtubmgifQ.CgeTKWAE0aOo8x9ljYKYPA';
    this.mapa = new Mapboxgl.Map({
    container: 'pxp-submit-property-map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [85.8490951524742, 20.28906441284518], // starting position
    zoom: 9 // starting zoom
    });

    this.createMarcador(85.8490951524742, 20.28906441284518);

    const geolocate = new Mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
      // Add the control to the map.
      this.mapa.addControl(geolocate);
      // Set an event listener that fires
      // when a geolocate event occurs.
      geolocate.on('geolocate', function() {
      console.log('A geolocate event has occurred.')
      console.log(geolocate);
      });
  }

createMarcador(lng: number, lat: number) {
  const marker = new Mapboxgl.Marker({
    draggable:true
  }).setLngLat([lng, lat])
    .addTo( this.mapa );

    marker.on('drag', () => {
      console.log( marker.getLngLat() );
    })
}
  
  submitPropertyForm = { userid:null, title: null, overview: null, type: null, status: null, yob: null, stories: null, r_count: null, p_space: null, price: null, beds: null, broom: null, location: null, s_feet: null, author: null, author_mail: null }
  
  submitPropertyFormData = 
  {
    title:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    overview:new FormControl('',[Validators.required]),
    type:new FormControl('',[Validators.required]),
    status:new FormControl('',[Validators.required]),
    yob:new FormControl(0,[Validators.required]),
    stories:new FormControl(0,[Validators.required]),
    r_count:new FormControl(0,[Validators.required]),
    p_space:new FormControl(0,[Validators.required]),
    price:new FormControl(0,[Validators.required]),
    beds:new FormControl(0,[Validators.required]),
    broom:new FormControl(0,[Validators.required]),
    location:new FormControl('',[Validators.required]),
    s_feet:new FormControl(0,[Validators.required]),
    author:new FormControl('',[Validators.required]),
    author_mail:new FormControl('',[Validators.required])
  }
  
  submit_PropertyForm() {
    this.submitPropertyForm.userid = this.UserId;
    this.submitPropertyForm.type = this.submitPropertyFormData.type.value;
    this.submitPropertyForm.overview=this.submitPropertyFormData.overview.value;
    this.submitPropertyForm.title=this.submitPropertyFormData.title.value;
    this.submitPropertyForm.yob=this.submitPropertyFormData.yob.value;
    this.submitPropertyForm.status=this.submitPropertyFormData.status.value;
    this.submitPropertyForm.stories = this.submitPropertyFormData.stories.value;
    this.submitPropertyForm.r_count=this.submitPropertyFormData.r_count.value;
    this.submitPropertyForm.p_space=this.submitPropertyFormData.p_space.value;
    this.submitPropertyForm.price=this.submitPropertyFormData.price.value;
    this.submitPropertyForm.beds=this.submitPropertyFormData.beds.value;
    this.submitPropertyForm.broom = this.submitPropertyFormData.broom.value;
    this.submitPropertyForm.location=this.submitPropertyFormData.location.value;
    this.submitPropertyForm.s_feet=this.submitPropertyFormData.s_feet.value;
    this.submitPropertyForm.author=this.submitPropertyFormData.author.value;
    this.submitPropertyForm.author_mail=this.submitPropertyFormData.author_mail.value;

    if ( this.submitPropertyForm.title == "" || this.submitPropertyForm.type == "" || this.submitPropertyForm.overview == "" || this.submitPropertyForm.status == "" || this.submitPropertyForm.yob == 0 || this.submitPropertyForm.yob == null || this.submitPropertyForm.stories == 0 || this.submitPropertyForm.r_count == 0 || this.submitPropertyForm.p_space == 0 || this.submitPropertyForm.price == 0 || this.submitPropertyForm.beds == 0 || this.submitPropertyForm.broom == 0 || this.submitPropertyForm.stories == null || this.submitPropertyForm.r_count == null || this.submitPropertyForm.p_space == null || this.submitPropertyForm.price == null || this.submitPropertyForm.beds == null || this.submitPropertyForm.broom == null || this.submitPropertyForm.location == "" || this.submitPropertyForm.s_feet == 0 || this.submitPropertyForm.s_feet == null ) {
      this.noti.warning('Please fill all the details..!', 'Warning')
    } else {
      this.propertiesService.property(this.submitPropertyForm)
    .subscribe(
      res => {
        this.noti.success("Your property has been Added..!", "Success")
        this._router.navigate(['/property'])
      });      
    console.log(this.submitPropertyForm)
    }
  }

  nameError() {
    if (this.submitPropertyFormData.title.hasError('required')) {
      return 'Name is required';
    }
    else if(this.submitPropertyFormData.title.hasError('minlength')){
      return 'Name must be a minimum length of 2';
    }
    else if (this.submitPropertyFormData.title.hasError('pattern')) {
      return 'Name should not contain numbers';
    }
  }

}





// import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { AuthService } from '../Services/auth.service';
// import { PropertiesService } from '../Services/properties.service'

// @Component({
//   selector: 'app-submit-property',
//   templateUrl: './submit-property.component.html',
//   styleUrls: ['./submit-property.component.scss']
// })
// export class SubmitPropertyComponent implements OnInit {


//   submitProperty: FormGroup = this.sP.group({
//     title: ['',[Validators.required]],
//     overview:['',[Validators.required]],
//     type:['',[Validators.required]],
//     status:['',[Validators.required]],
//     yob:['',[Validators.required]],
//     stories:['',[Validators.required]],
//     r_count:['',[Validators.required]],
//     p_space:['',[Validators.required]],
//     price:['',[Validators.required]],
//     beds:['',[Validators.required]],
//     broom:['',[Validators.required]],
//     location:['',[Validators.required]],
//     s_feet:['',[Validators.required]],
//     author:['',[Validators.required]],
//     author_mail:['',[Validators.required]],
//     userid:['',[Validators.required]]
//   });




//   constructor(public _authService: AuthService, private sP:FormBuilder, private _router: Router, private snackbar:MatSnackBar, private propertiesService: PropertiesService) { }
//   UserId
//   ngOnInit( ): void {
//     if(this._authService.loggedIn()){
//       this._authService.getUserId().subscribe((data)=>{
//         this.UserId = data
// console.log(this.UserId);

//         this.submitProperty.controls.userid.setValue(this.UserId)
//         this._authService.getUserName(this.UserId).subscribe((name)=>{
//           console.log(name)
//           // this.submitProperty.setValue({author: name})
//           // this.submitProperty.author.setValue(name)
//           this.submitProperty.controls.author.setValue(name);
//         })
//         this._authService.getUserEmail(this.UserId).subscribe((mail)=>{
//           // this.submitProperty.author_mail.setValue(mail)
//           console.log(mail)
//           // this.submitProperty.setValue({author_mail: mail})
//           this.submitProperty.controls.author_mail.setValue(mail);
//         })
//       }) 
//     }
//   }


  
   
  
//   // submitPropertyForm = { userid: null, title: null, overview: null, type: null, status: null, yob: null, stories: null, r_count: null, p_space: null, price: null, beds: null, broom: null, location: null, s_feet: null, author: null, author_mail: null }
  
//   // submitPropertyFormData : FormGroup = 
//   // {
//   //   title:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]),
//   //   overview:new FormControl('',[Validators.required]),
//   //   type:new FormControl('',[Validators.required]),
//   //   status:new FormControl('',[Validators.required]),
//   //   yob:new FormControl('0',[Validators.required]),
//   //   stories:new FormControl('0',[Validators.required]),
//   //   r_count:new FormControl('0',[Validators.required]),
//   //   p_space:new FormControl('0',[Validators.required]),
//   //   price:new FormControl('0',[Validators.required]),
//   //   beds:new FormControl('0',[Validators.required]),
//   //   broom:new FormControl('0',[Validators.required]),
//   //   location:new FormControl('',[Validators.required]),
//   //   s_feet:new FormControl('0',[Validators.required]),
//   //   author:new FormControl('',[Validators.required]),
//   //   author_mail:new FormControl('',[Validators.required])
//   // }
  
//   submit_PropertyForm() {
//     // this.submitPropertyForm.userid = this.UserId;
//     // this.submitPropertyForm.type = this.submitPropertyFormData.type.value;
//     // this.submitPropertyForm.overview=this.submitPropertyFormData.overview.value;
//     // this.submitPropertyForm.title=this.submitPropertyFormData.title.value;
//     // this.submitPropertyForm.yob=this.submitPropertyFormData.yob.value;
//     // this.submitPropertyForm.status=this.submitPropertyFormData.status.value;
//     // this.submitPropertyForm.stories = this.submitPropertyFormData.stories.value;
//     // this.submitPropertyForm.r_count=this.submitPropertyFormData.r_count.value;
//     // this.submitPropertyForm.p_space=this.submitPropertyFormData.p_space.value;
//     // this.submitPropertyForm.price=this.submitPropertyFormData.price.value;
//     // this.submitPropertyForm.beds=this.submitPropertyFormData.beds.value;
//     // this.submitPropertyForm.broom = this.submitPropertyFormData.broom.value;
//     // this.submitPropertyForm.location=this.submitPropertyFormData.location.value;
//     // this.submitPropertyForm.s_feet=this.submitPropertyFormData.s_feet.value;
//     // this.submitPropertyForm.author=this.submitPropertyFormData.author.value;
//     // this.submitPropertyForm.author_mail=this.submitPropertyFormData.author_mail.value;
    
//     this.propertiesService.property(this.submitProperty.value)
//     .subscribe(
//       res => {
//         this.snackbar.open('Your property has been Added Succesfully!!', 'OK', {
//           duration: 3000,
//         });
//         this._router.navigate(['/property'])
//       });      
//     console.log(this.submitProperty.value)
//   }

// }
