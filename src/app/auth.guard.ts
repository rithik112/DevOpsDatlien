import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { DLoginComponent } from './Dialogs/d-login/d-login.component';
import { AuthService } from './Services/auth.service';
import { NotifierService } from './Services/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService,
    private _router: Router, private dialog:MatDialog, private noti: NotifierService) { }
  
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(DLoginComponent, dialogConfig)   
      this.noti.warning('Please Login..!', 'Warning')       
      // this._router.navigate(['/login'])
      // this.snackbar.open('Please Login..!','OK',{
      //   duration: 4000,
      // });
      return false
    }
  }

}
