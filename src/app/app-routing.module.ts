import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';

const routes: Routes = [
  {path:'',component:BejelentkezesComponent},
  {path:'register', component:RegisztracioComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
