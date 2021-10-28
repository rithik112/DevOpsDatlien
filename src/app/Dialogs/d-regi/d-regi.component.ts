import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotifierService } from 'src/app/Services/notifier.service';
import { DLoginComponent } from '../d-login/d-login.component';

@Component({
  selector: 'app-d-regi',
  templateUrl: './d-regi.component.html',
  styleUrls: ['./d-regi.component.scss']
})
export class DRegiComponent {

  registerUserData = { name: "", username: "", email: "", password: "", gender: "" }

  constructor(private _auth: AuthService,
    private _router: Router, private noti: NotifierService, private dialogRef: MatDialogRef<DRegiComponent>, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  registerUser() {
    if ( this.registerUserData.email == "" || this.registerUserData.username == "" || this.registerUserData.name == "" || this.registerUserData.password == "" || this.registerUserData.gender == "" )
    this.noti.warning('Please fill all the details..!', 'Warning')
    else {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        this.noti.info("To đất liền Family", "Welcome")
        localStorage.setItem('token', res.token)
        this.dialogRef.close();
        this._router.navigate(['/home'])
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 409) {
            this.noti.error("This Mail has been Registered Already", "Opps..!")
            this.registerUserData.username="";
            this.registerUserData.email="";
            this.registerUserData.password="";
            this.registerUserData.name="";
            this.registerUserData.gender = "";
          }
        }
      }
    )    
  }  
  }

  close() {
    this.dialogRef.close();
  }

  redirect(){
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DLoginComponent,dialogConfig)
  }
}
