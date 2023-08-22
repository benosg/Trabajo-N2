import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }           from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './template/home/home.component';
import { HeaderComponent } from './navbar/header/header.component';
import { PostSingleComponent } from './template/post-single/post-single.component';
import { FooterComponent } from './navbar/footer/footer.component';
import { PostsComponent } from './template/posts/posts.component';
import { SuscripcionComponent } from './template/suscripcion/suscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostSingleComponent,
    FooterComponent,
    PostsComponent,
    SuscripcionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
