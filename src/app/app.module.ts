import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  LoginComponent,
  LoginDialog,
} from './components/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './http/services/interceptors/auth.interceptor';
import { PostsComponent } from './components/posts/posts.component';
import { MatCardModule } from '@angular/material/card';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountComponent } from './components/settings/account/account.component';
import { AppearanceComponent } from './components/settings/appearance/appearance.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import {
  DangerZoneComponent,
  DeleteDialog,
} from './components/settings/danger-zone/danger-zone.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { FileComponent } from './components/file/file.component';
import { ImageDialogComponent } from './components/file/dialog/image-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProjectsComponent,
    ScrollToTopComponent,
    ImprintComponent,
    LoginComponent,
    LoginDialog,
    PostsComponent,
    SettingsComponent,
    AccountComponent,
    AppearanceComponent,
    ProfileComponent,
    DangerZoneComponent,
    DeleteDialog,
    NewPostComponent,
    FileComponent,
    ImageDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FlexModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    ClipboardModule,
    MatTooltipModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
