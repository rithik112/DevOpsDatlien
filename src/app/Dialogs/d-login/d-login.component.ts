import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotifierService } from 'src/app/Services/notifier.service';
import { DRegiComponent } from '../d-regi/d-regi.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-d-login',
  templateUrl: './d-login.component.html',
  styleUrls: ['./d-login.component.scss']
})
export class DLoginComponent implements OnInit {

  loginUserData = { email: "", password: "" }

  constructor(private _auth: AuthService,
    private _router: Router, private noti: NotifierService, private dialogRef: MatDialogRef<DLoginComponent>, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginUserData.email == "" || this.loginUserData.password == "")
    { 
      this.noti.warning('Please fill all the details..!', 'Warning')
    }
    else
    {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.noti.success("Logged In Successfully..!", "Congrats")
        localStorage.setItem('token', res.token)
        this.dialogRef.close();
        this._router.navigate(['/home'])
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this.noti.error('Pleasr try again..!', 'Invalid Credentials')
            this.loginUserData.email='';
            this.loginUserData.password='';
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

  forgetPassword(){
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ForgetPasswordComponent,dialogConfig)
  }

}
