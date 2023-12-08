import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LeftNavComponent,
    RightNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: ':id', component: ProfileComponent },
      { path: '**', redirectTo: ''}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
