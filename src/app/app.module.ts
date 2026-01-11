import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


import {MatStepperModule} from '@angular/material/stepper';
import { UdvozloComponent } from './udvozlo/udvozlo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

// Home Component
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { SettingsComponent } from './settings/settings.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

// Settings Component
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { NotificationsComponent } from './notifications/notifications.component';

// Notifications Component
import {MatListModule} from '@angular/material/list';
import { UserDeletionComponent } from './user-deletion/user-deletion.component';


@NgModule({
  declarations: [
    AppComponent,
    BejelentkezesComponent,
    RegisztracioComponent,
    UdvozloComponent,
    HomeComponent,
    SettingsComponent,
    NotificationsComponent,
    UserDeletionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class ToolbarSimpleExample {}