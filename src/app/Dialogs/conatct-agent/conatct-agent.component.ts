import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/s-property/s-property.component';
import { AuthService } from 'src/app/Services/auth.service';
import { ContactAuthorService } from 'src/app/Services/contact-author.service';
import { NotifierService } from 'src/app/Services/notifier.service';

@Component({
  selector: 'app-conatct-agent',
  templateUrl: './conatct-agent.component.html',
  styleUrls: ['./conatct-agent.component.scss']
})
export class ConatctAgentComponent implements OnInit {

  constructor(public _authService: AuthService, private _router: Router, private noti: NotifierService, private dialogRef: MatDialogRef<ConatctAgentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private contactAgent: ContactAuthorService) { }

  UserId

  ngOnInit(): void {
    if(this._authService.loggedIn()){
      this._authService.getUserId().subscribe((data)=>{
        this.UserId=data
        this._authService.getName(this.UserId).subscribe((name)=>{
          this.contactAgentForm.name = name
        })
        this._authService.getUserEmail(this.UserId).subscribe((mail)=>{
          this.contactAgentForm.email = mail
        })
      }) 
    }
  }

  contactAgentForm = { requestedUserId: null, status : "pending", propertyName: null, propertyPrice: null, propertyAddr: null, propertyId: null, propertyAuthorName: null, authorId: null, name: null, email: null, phone: null, message: "I would like more information about ...." }

  contactAgentform() {
    this.contactAgentForm.authorId = this.data.authorId
    this.contactAgentForm.propertyId = this.data.propertyId
    this.contactAgentForm.propertyName = this.data.propertyName
    this.contactAgentForm.propertyPrice = this.data.propertyPrice
    this.contactAgentForm.propertyAddr = this.data.propertyAddr
    this.contactAgentForm.propertyAuthorName = this.data.propertyAuthorName
    this.contactAgentForm.requestedUserId = this.data.requestedUserId

    if ( this.contactAgentForm.email == "" || this.contactAgentForm.name == "" || this.contactAgentForm.phone == "" || this.contactAgentForm.message == "" ) {
      this.noti.warning('Please fill all the details..!', 'Warning')
   } else {
    this.contactAgent.message(this.contactAgentForm)
    .subscribe(
      res => {
        this.dialogRef.close();
        this.noti.success('Your Message has been delivered to the Author..!', 'Success')
        this._router.navigate(['/property'])
      }, err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 409) {
            this.dialogRef.close();
            this.noti.info("You have already contacted to the Owner, Check the Status in your Profile..!", "Info")
            this.noti.warning("You can't contact an Property Owner more than one time..!",'Warning')
          }
        }
      });      
    }
    // console.log(this.contactAgentForm)
  }

  close() {
    this.dialogRef.close();
  }

}
