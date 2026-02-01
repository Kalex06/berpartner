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


const routes: Routes = [
  {path:'', component:UdvozloComponent},
  {path:'login',component:BejelentkezesComponent},
  {path:'register', component:RegisztracioComponent},
  {path:'home', component:HomeComponent},
  {path:'settings', component:SettingsComponent},
  {path:'profile', component:ProfileComponent},
  {path:'renteditems', component:RenteditemsComponent},
  {path:'myitems', component:MyitemsComponent},
  {path:'upload', component:UploadComponent},
  {path:'item-details', component:ItemDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
