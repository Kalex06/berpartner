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
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';


import {MatStepperModule} from '@angular/material/stepper';
import { UdvozloComponent } from './udvozlo/udvozlo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

// Home Component
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { SettingsComponent } from './settings/settings.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';




// Settings Component
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { NotificationsComponent } from './notifications/notifications.component';

// Notifications Component
import {MatListModule} from '@angular/material/list';
import { UserDeletionComponent } from './user-deletion/user-deletion.component';
import { ProfileComponent } from './profile/profile.component';

//interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RenteditemsComponent } from './renteditems/renteditems.component';
import { MyitemsComponent } from './myitems/myitems.component';
import { UploadComponent } from './upload/upload.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

// Item Details Component
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeHu);

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
    ProfileComponent,
    RenteditemsComponent,
    MyitemsComponent,
    UploadComponent,
    ItemDetailsComponent,
    NavBarComponent,
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
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    NgxMaskDirective,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class ToolbarSimpleExample {}