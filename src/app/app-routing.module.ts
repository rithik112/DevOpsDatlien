import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsComponent } from './agents/agents.component';
import { AuthGuard } from './auth.guard';
import { AppartmentsComponent } from './Categories/appartments/appartments.component';
import { BeachHouseComponent } from './Categories/beach-house/beach-house.component';
import { CommercialComponent } from './Categories/commercial/commercial.component';
import { DuplexComponent } from './Categories/duplex/duplex.component';
import { ResidentialComponent } from './Categories/residential/residential.component';
import { VillasComponent } from './Categories/villas/villas.component';
import { ContactComponent } from './contact/contact.component';
import { ForgetPasswordComponent } from './Dialogs/forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertyComponent } from './property/property.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SAgentComponent } from './s-agent/s-agent.component';
import { SPropertyComponent } from './s-property/s-property.component';
import { SubmitPropertyComponent } from './submit-property/submit-property.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'villas', component: VillasComponent },
  { path: 'appartments', component: AppartmentsComponent },
  { path: 'b-houses', component: BeachHouseComponent },
  { path: 'duplex', component: DuplexComponent },
  { path: 'resi', component: ResidentialComponent },
  { path: 'coms', component: CommercialComponent },
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard], },
  { path: 'contact', component: ContactComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'property', component: PropertyComponent },
  { path: 's-agent', component: SAgentComponent , canActivate: [AuthGuard],},
  { path: 's-property/:id', component: SPropertyComponent , canActivate: [AuthGuard],},
  { path: 'submit-property', component: SubmitPropertyComponent, canActivate:[AuthGuard] },
  { path: 'forgot-password/:id', component: ResetPasswordComponent },
  { path: '**',   redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
