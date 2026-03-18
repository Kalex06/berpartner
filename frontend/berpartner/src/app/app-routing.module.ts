import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { UdvozloComponent } from './udvozlo/udvozlo.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { RenteditemsComponent } from './renteditems/renteditems.component';
import { MyitemsComponent } from './myitems/myitems.component';
import { UploadComponent } from './upload/upload.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { authGuard } from './guards/auth.guard';
import { EditPostComponent } from './edit-post/edit-post.component';


const routes: Routes = [
  {path:'', component:UdvozloComponent},
  {path:'login',component:BejelentkezesComponent},
  {path:'register', component:RegisztracioComponent},
  {path:'home', component:HomeComponent,canActivate: [authGuard]},
  {path:'settings', component:SettingsComponent,canActivate: [authGuard]},
  {path:'profile/:id', component:ProfileComponent,canActivate: [authGuard]},
  {path:'renteditems', component:RenteditemsComponent,canActivate: [authGuard]},
  {path:'myitems', component:MyitemsComponent,canActivate: [authGuard]},
  {path:'upload', component:UploadComponent,canActivate: [authGuard]},
  {path: 'notifications', component: NotificationsComponent,canActivate: [authGuard]},
  {path:'item-details/:id', component:ItemDetailsComponent,canActivate: [authGuard]},
  {path: 'edit-post', component: EditPostComponent,canActivate: [authGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
