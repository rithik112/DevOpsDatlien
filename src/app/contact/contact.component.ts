import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactUsService } from '../Services/contact-us.service';
import { NotifierService } from '../Services/notifier.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public _authService: AuthService, private _router: Router, private noti: NotifierService, private contactService: ContactUsService) { }
  UserId
  ngOnInit(): void {
    if(this._authService.loggedIn()){
      this._authService.getUserId().subscribe((data)=>{
        this.UserId=data
        this._authService.getUserName(this.UserId).subscribe((name)=>{
          this.contactFormData.name.setValue(name)
        })
        this._authService.getUserEmail(this.UserId).subscribe((mail)=>{
          this.contactFormData.email.setValue(mail)
        })
      }) 
    }
  }
  
  contactForm = { name: null, email: null, phone: null, regarding:"What is this regarding?", feedback: null }
  
  contactFormData = 
  {
    name:new FormControl('',[Validators.required,Validators.minLength(2)]),
    regarding:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.minLength(10),Validators.maxLength(10)]),
    feedback:new FormControl('',[Validators.required])
  }
  regarding

  hide = true;
  
  // getErrorMessage() {
  //   if (this.contactFormData.email.hasError('required')) {
  //     return 'Email is required';
  //   }
  //   else if(this.contactFormData.email.hasError('email')){
  //     return "This doesn't look like an email address";
  //   }
  // }
  
  // getMessage(){
  //   if (this.contactFormData.name.hasError('required')) {
  //     return 'Name is required';
  //   }
  //   else if(this.contactFormData.name.hasError('minlength')){
  //     return 'Name must be a minimum length of 2';
  //   }
  // }

  // getMessagePhone(){
  //   if(this.contactFormData.name.hasError('minlength')){
  //     return 'Phone no. must be of 10 digits';
  //   }
  //   else if(this.contactFormData.name.hasError('maxlength')){
  //     return 'Phone no. must be of 10 digits';
  //   }
  // }

  // getErrorComment(){
  //   if (this.contactFormData.feedback.hasError('required')) {
  //     return 'Comment is required';
  //   }
  // }

  contactform() {
    this.contactForm.regarding = this.contactFormData.regarding.value;
    this.contactForm.email=this.contactFormData.email.value;
    this.contactForm.name=this.contactFormData.name.value;
    this.contactForm.phone=this.contactFormData.phone.value;
    this.contactForm.feedback=this.contactFormData.feedback.value;
    if ( this.contactForm.email == "" || this.contactForm.name == "" || this.contactForm.feedback == "" || this.contactForm.regarding == "" ) {
      this.noti.warning('Please fill all the details..!', 'Warning')
   } else {
    this.contactService.feedback(this.contactForm)
    .subscribe(
      res => {
        this.noti.info('We will reach you Soon..!', 'Thanks for contacting Us')
        this._router.navigate(['/home'])
      });      
    }
    // console.log(this.contactForm)
  }

}
