import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CourselComponent } from './coursel/coursel.component';
import { AgentsComponent } from './agents/agents.component';
import { ContactComponent } from './contact/contact.component';
import { SAgentComponent } from './s-agent/s-agent.component';
import { SPropertyComponent } from './s-property/s-property.component';
import { PropertyComponent } from './property/property.component';
import { SubmitPropertyComponent } from './submit-property/submit-property.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RTourComponent } from './Dialogs/r-tour/r-tour.component';
import { ConatctAgentComponent } from './Dialogs/conatct-agent/conatct-agent.component';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AppartmentsComponent } from './Categories/appartments/appartments.component';
import { VillasComponent } from './Categories/villas/villas.component';
import { DuplexComponent } from './Categories/duplex/duplex.component';
import { CommercialComponent } from './Categories/commercial/commercial.component';
import { ResidentialComponent } from './Categories/residential/residential.component';
import { BeachHouseComponent } from './Categories/beach-house/beach-house.component';
import { PropertiesService } from './Services/properties.service';
import { ContactUsService } from './Services/contact-us.service';
import { SavedPropertiesService } from './Services/saved-properties.service';
import { HeaderComponent } from './header/header.component';
import { DLoginComponent } from './Dialogs/d-login/d-login.component';
import { FooterComponent } from './footer/footer.component';
import { DRegiComponent } from './Dialogs/d-regi/d-regi.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './Services/spinner.service';
import { SpinnnerInterceptorService } from './Services/spinnner-interceptor.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { NotifierService } from './Services/notifier.service';
import { EditProfileComponent } from './Dialogs/edit-profile/edit-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForgetPasswordComponent } from './Dialogs/forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    CourselComponent,
    AgentsComponent,
    ContactComponent,
    SAgentComponent,
    SPropertyComponent,
    PropertyComponent,
    SubmitPropertyComponent,
    HomeComponent,
    RTourComponent,
    ConatctAgentComponent,
    ProfileComponent,
    AppartmentsComponent,
    VillasComponent,
    DuplexComponent,
    CommercialComponent,
    ResidentialComponent,
    BeachHouseComponent,
    HeaderComponent,
    DLoginComponent,
    FooterComponent,
    DRegiComponent,
    SpinnerComponent,
    EditProfileComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule ,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule ,
  ],
  providers: [AuthService, PropertiesService, ContactUsService, SavedPropertiesService, AuthGuard, SpinnerService, NotifierService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: SpinnnerInterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
