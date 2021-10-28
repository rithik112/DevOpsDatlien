import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DLoginComponent } from '../Dialogs/d-login/d-login.component';
import { AuthService } from '../Services/auth.service';
import { SpinnerService } from '../Services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _authService: AuthService, private dialog:MatDialog, public loaderService: SpinnerService) {}

  ngOnInit(): void {
  }

  
  login(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DLoginComponent,dialogConfig)
  }

}
