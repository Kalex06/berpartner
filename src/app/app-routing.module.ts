import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { UdvozloComponent } from './udvozlo/udvozlo.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'', component:UdvozloComponent},
  {path:'login',component:BejelentkezesComponent},
  {path:'register', component:RegisztracioComponent},
  {path:'home', component:HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
