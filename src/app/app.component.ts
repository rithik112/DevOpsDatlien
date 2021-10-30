import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './Services/auth.service';
import { SpinnerService } from './Services/spinner.service';
import { datadogRum } from '@datadog/browser-rum';
    
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public _authService: AuthService) {}
  }

  datadogRum.init({
    applicationId: 'fc61be18-4e4f-43b1-8476-df40e799c1c6',
    clientToken: 'pubd987f1140fd4528eddfbf2e461d76231',
    site: 'datadoghq.com',
    service:'devops-datlien',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'allow'
});
    
datadogRum.startSessionReplayRecording();