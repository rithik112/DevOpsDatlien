import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/Services/notifier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetData = {_id:"", password:""};
  userId;
  constructor(private route: ActivatedRoute, private noti: NotifierService, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params['id'];
    this._auth.getUserIdByToken(id).subscribe(
      (res)=>{
        this.userId=res
        this.resetData._id=this.userId
      })
  }

  reset(){
    if (this.resetData.password == ""){ 
      this.noti.warning('Please enter the password..!', 'Warning')
    }
    else{
    this._auth.resetUser(this.resetData)
    .subscribe(
      res => {
        this.noti.success("Password Reset Successful..!", "Congrats")
        this._router.navigate(['/home'])
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this.noti.error('Please try again..!', 'Invalid Url')
            this.resetData.password='';
          }
        }
      }
    ) 
  }
  }

}
