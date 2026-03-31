import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {NgxMaskDirective,NgxMaskPipe, provideNgxMask} from 'ngx-mask';

import {MatStepperModule} from '@angular/material/stepper';
import { UdvozloComponent } from './udvozlo/udvozlo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

import {ToastrModule} from 'ngx-toastr';

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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';


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

import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditDataComponent } from './edit-data/edit-data.component';




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
    PrivacypolicyComponent,
    ImprintComponent,
    ImageDialogComponent,
    EditPostComponent,
    EditDataComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    NgxMaskPipe,
    MatSelectModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatDividerModule,
    MatBadgeModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask(),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'hu-HU' },
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' },
    provideHttpClient(
      withInterceptorsFromDi()
    ),
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