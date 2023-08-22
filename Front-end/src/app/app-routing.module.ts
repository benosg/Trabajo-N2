import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent } from '../app/template/home/home.component';
import {PostSingleComponent } from '../app/template/post-single/post-single.component';
import {PostsComponent } from '../app/template/posts/posts.component';
import { SuscripcionComponent } from '../app/template/suscripcion/suscripcion.component';
import { from } from 'rxjs';


const routes: Routes = [
  {path: '',                   component: HomeComponent },
  {path: 'posts',                   component: PostsComponent },
  {path: 'post/:num',                   component: PostSingleComponent },
  {path: 'suscribir',                   component: SuscripcionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
