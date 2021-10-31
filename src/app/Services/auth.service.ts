import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://h-server.herokuapp.com/api/register";
  private _loginUrl = "https://h-server.herokuapp.com/api/login";
  private _forgetUrl = "https://h-server.herokuapp.com/api/forgetpassword";
  private _resetUrl = "https://h-server.herokuapp.com/api/resetpassword";

  constructor(private http: HttpClient,
    private _router: Router, private noti: NotifierService,) { }

    registerUser(user) {
      return this.http.post<any>(this._registerUrl, user)
    }
  
    loginUser(user) {
      return this.http.post<any>(this._loginUrl, user)
    }
  
    logoutUser() {
      localStorage.removeItem('token')
      this.noti.info("Logged Out Successfully..!", "Info")
      this._router.navigate(['/home'])
    }
  
    getToken() {
      return localStorage.getItem('token')
    }
  
    loggedIn() {
      return !!localStorage.getItem('token')    
    }

    getUserId(){
      return this.http.get(`https://h-server.herokuapp.com/api/userid`,{
        params:new HttpParams().append('token',localStorage.getItem('token'))
      })
    }
    
    getUserName(id){
      return this.http.get(`https://h-server.herokuapp.com/api/username/${id}`)
    }

    getName(id){
      return this.http.get(`https://h-server.herokuapp.com/api/name/${id}`)
    }

    getUserEmail(id){
      return this.http.get(`https://h-server.herokuapp.com/api/email/${id}`)
    }

    getProfile(id){
      return this.http.get(`https://h-server.herokuapp.com/api/profile/${id}`)
    }

    getGender(id){
      return this.http.get(`https://h-server.herokuapp.com/api/gender/${id}`)
    }

    editProfile(id,user){
      return this.http.patch(`https://h-server.herokuapp.com/api/edit-profile/${id}`,user);
    }

    forgetUser(user){
      return this.http.post<any>(this._forgetUrl, user)
    }

    resetUser(user){
      return this.http.patch<any>(this._resetUrl, user)
    }

    getUserIdByToken(id){
      return this.http.get(`https://h-server.herokuapp.com/api/userid`,{
        params:new HttpParams().append('token',id)
      })
    }
}


