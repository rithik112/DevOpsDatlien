import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { NotifierService } from 'src/app/Services/notifier.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DRegiComponent } from '../d-regi/d-regi.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  forgetData = { email: "" }

  constructor(private _router: Router, private _auth: AuthService, private noti: NotifierService, private dialogRef: MatDialogRef<ForgetPasswordComponent>, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  forgetUser() {
    if (this.forgetData.email == "") {
      this.noti.warning('Please Enter an Valid Email', 'Warning')
    }
    else {
      this._auth.forgetUser(this.forgetData)
      .subscribe(
        res=>{
          this.noti.info("Reset link has been sent to your mail..!", "Success")
          this.dialogRef.close();
          this._router.navigate(['/home'])
        },
        err =>{
          if(err instanceof HttpErrorResponse){
            if (err.status === 401) {
              this.noti.error('Please try again..!', 'User does not exist')
              this.forgetData.email='';
            }
          }
        }
      )
    }
  }
  close() {
    this.dialogRef.close();
  }

  regi(){
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DRegiComponent,dialogConfig)
  }
}