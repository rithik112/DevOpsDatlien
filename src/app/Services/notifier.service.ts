import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor( private notifier: ToastrService) { }

  warning( message, messageTitle){
    this.notifier.warning( message, messageTitle,{
      newestOnTop : true,
      progressBar	: true,
      closeButton : true,
      tapToDismiss: true,
      extendedTimeOut	: 3000,
      positionClass : 'toast-top-right',
      onActivateTick : true
    });
  }

  info( message, messageTitle){
    this.notifier.info( message, messageTitle,{
      newestOnTop : true,
      progressBar	: true,
      closeButton : true,
      tapToDismiss: true,
      positionClass: 'toast-top-right'
    });
  }

  success( message, messageTitle){
    this.notifier.success( message, messageTitle,{
      newestOnTop : true,
      progressBar	: true,
      closeButton : true,
      tapToDismiss: true,
      positionClass: 'toast-top-right'
    });
  }

  error( message, messageTitle){
    this.notifier.error( message, messageTitle,{
      newestOnTop : true,
      progressBar	: true,
      closeButton : true,
      tapToDismiss: true,
      positionClass: 'toast-top-right'
    });
  }
}