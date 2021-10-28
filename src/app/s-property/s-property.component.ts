import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConatctAgentComponent } from '../Dialogs/conatct-agent/conatct-agent.component';
import { AuthService } from '../Services/auth.service';
import { NotifierService } from '../Services/notifier.service';
import { PropertiesService } from '../Services/properties.service';
import { SavedPropertiesService } from '../Services/saved-properties.service';

export interface DialogData {
  authorId: String;
  propertyAuthorName: String;
  propertyId: String;
  propertyName: String;
  propertyAddr: String;
  propertyPrice: String;
  requestedUserId: String
}

@Component({
  selector: 'app-s-property',
  templateUrl: './s-property.component.html',
  styleUrls: ['./s-property.component.scss']
})

export class SPropertyComponent implements OnInit {

  pDetails
  rId

  constructor(private route: ActivatedRoute, private _proService: PropertiesService, public _authService: AuthService,
    private savePService: SavedPropertiesService, private noti: NotifierService, private dialog:MatDialog) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    this._proService.getSProperties(id).subscribe((data)=>{
      this.pDetails = data[0];
      console.log(data)
    })
    this._authService.getUserId().subscribe((data)=>{
      this.rId = data;
    })
  }

  savePropertyForm = { propertyId:null, userid:null, title: null, overview: null, type: null, status: null, yob: null, stories: null, r_count: null, p_space: null, price: null, beds: null, broom: null, location: null, s_feet: null, author: null, author_mail: null }


  savePro(){
    if(this._authService.getToken()){
      this._authService.getUserId().subscribe((data)=>{
        this.savePropertyForm.propertyId=this.pDetails._id;
        this.savePropertyForm.userid=data;
        this.savePropertyForm.type = this.pDetails.type;
        this.savePropertyForm.overview=this.pDetails.overview;
        this.savePropertyForm.title=this.pDetails.title;
        this.savePropertyForm.yob=this.pDetails.yob;
        this.savePropertyForm.status=this.pDetails.status;
        this.savePropertyForm.stories = this.pDetails.stories;
        this.savePropertyForm.r_count=this.pDetails.r_count;
        this.savePropertyForm.p_space=this.pDetails.p_space;
        this.savePropertyForm.price=this.pDetails.price;
        this.savePropertyForm.beds=this.pDetails.beds;
        this.savePropertyForm.broom = this.pDetails.broom;
        this.savePropertyForm.location=this.pDetails.location;
        this.savePropertyForm.s_feet=this.pDetails.s_feet;
        this.savePropertyForm.author=this.pDetails.author;
        this.savePropertyForm.author_mail=this.pDetails.author_mail;
        this.savePService.addCart(this.savePropertyForm)
          .subscribe(
            (res) => {
            },
            err => {
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 401 || err.status === 500) {
                  this.noti.error("Failed to add this property to Saved Properties", "Error")
                }
                if (err.status === 409) {
                  this.noti.info("Already in Saved Properties", "Info")
                }
                if(err.status===200){
                  this.noti.success("Added to Saved Properties Successfully..!", "Success")
                }
              }
            });
      })
    }
    else{
      this.noti.warning("Please Login To Add this property to Saved Properties","Warning")
    }
  }

  onConfirm(){
    this.dialog.open(ConatctAgentComponent, {width:'550px',height:'620px', 
    data: {
      authorId: this.pDetails.userid, 
      propertyId: this.pDetails._id, 
      propertyAuthorName: this.pDetails.author,
      propertyName: this.pDetails.title,
      propertyAddr: this.pDetails.location,
      propertyPrice: this.pDetails.price,
      requestedUserId: this.rId
    }})
  }
}
