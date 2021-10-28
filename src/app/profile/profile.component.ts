import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../Dialogs/edit-profile/edit-profile.component';
import { AuthService } from '../Services/auth.service';
import { ContactAuthorService } from '../Services/contact-author.service';
import { NotifierService } from '../Services/notifier.service';
import { PropertiesService } from '../Services/properties.service';
import { SavedPropertiesService } from '../Services/saved-properties.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  length
  count
  UserId
  User
  aname
  email
  savePro = []
  subPro = []

byulen
toulen

  byU = []
  toU = []

  // conf = { status: null, requestedUserId: null, authorId: null, propertyId: null }
  conf = { status: null }

  constructor(private saveProService : SavedPropertiesService, private cInfos : ContactAuthorService, private submitProCountService:PropertiesService, public _authService:AuthService, private router:Router, private noti: NotifierService, private dialog:MatDialog) {  }
  
  ngOnInit(): void {
    if(this._authService.loggedIn()){
      this._authService.getUserId().subscribe(
        (res)=>{
          this.UserId=res
          this.cInfos.toYou(this.UserId).subscribe((res:any[]) => {
            this.toU = res
            this.toulen = this.toU.length
          })
          this._authService.getUserName(this.UserId).subscribe((name)=>{
            this.User=name;
          })
          this._authService.getName(this.UserId).subscribe((name)=>{
            this.aname=name;
          })
          this._authService.getUserEmail(this.UserId).subscribe((mail)=>{
            this.email=mail;
            this.cInfos.byYou(this.email).subscribe((res:any[]) => {
              this.byU = res
              this.byulen = this.byU.length
            })
          })
          this.saveProService.getCart(res).subscribe(
            (data:any[])=>{
              this.savePro=data
              this.length=this.savePro.length;
            });
          this.submitProCountService.getSPropertiesCount(res).subscribe(
            (data:any[])=>{
              this.subPro=data
              this.count=this.subPro.length;
            });
        });
    }
    else{
      this.noti.warning('Please LogIn..!', 'Warning')
    } 
  }
  clearSavedAll(){
    this.saveProService.clearCart(this.UserId).subscribe((res) => {
      this.noti.info("Cleared all the properties from Saved Properties Successfully..!", "Info")
      this.ngOnInit()
    })
  }

  clearSubmittedAll(){
    this.submitProCountService.clearAll(this.UserId).subscribe((res) => {
      this.noti.info("Cleared all the properties from Submitted Properties Successfully..!", "Info")
      this.ngOnInit()
    })
  }

  clearSubmittedAllDISABLED(){
    this.noti.info("Contact Admin : admin@datlien.ml", "Info")
    this.noti.warning("This Feature has been disabled by the admin..!", "Warning")
  }

  deleteProperty = {
    userid: null,
    propertyId: null
  }

  deleteSubmittedProperty = {
    userid: null,
    propertyId: null
  }

  deleteSaved(userid, propertyId){
    this.deleteProperty.userid=userid;
    this.deleteProperty.propertyId=propertyId;
    this.saveProService.deleteProduct(this.deleteProperty)
    .subscribe((res)=>{    },err=>{
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 200) {
          this.ngOnInit();
          this.noti.info("Removed from Saved Properties Successfully..!", "Info")
        }
      }
    })
  }

  deleteSubmitted(userid, propertyId){
    this.deleteSubmittedProperty.userid=userid;
    this.deleteSubmittedProperty.propertyId=propertyId;
    console.log(this.deleteSubmittedProperty);
    this.submitProCountService.deleteProperty(this.deleteSubmittedProperty)
    .subscribe((res)=>{    },err=>{
      if( err instanceof HttpErrorResponse ) {
        if (err.status === 200) {
          this.ngOnInit();
          this.noti.info("Removed from Saved Properties Successfully..!", "Info")
        }
      }
    })
  }
  
  deleteSubmittedDISABLED(){
    this.noti.info("Contact Admin : admin@datlien.ml", "Info")
    this.noti.warning("This Feature has been disabled by the admin..!", "Warning")
  }

  editpro(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(EditProfileComponent,dialogConfig)
  }

  statusAcc( id ){
    // this.conf.requestedUserId = requestedUserId
    // this.conf.authorId = authorId
    // this.conf.propertyId = propertyId
    this.conf.status = "accepted"
    this.cInfos.accept( this.conf, id ).subscribe((res) => {
      this.ngOnInit()
    })
  }

  statusRej( id ){
    // this.conf.requestedUserId = requestedUserId
    // this.conf.authorId = authorId
    // this.conf.propertyId = propertyId
    this.conf.status = "rejected"
    this.cInfos.reject( this.conf, id ).subscribe((res) => {
      this.ngOnInit()
    })
  }

  refresh(){
    this.ngOnInit()
  }
}
