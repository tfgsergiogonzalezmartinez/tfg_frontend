import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './Layout/LoginLayout/LoginLayout.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { MainLayoutComponent } from './Layout/MainLayout/MainLayout.component';
import { loginGuard } from './Guards/Login.guard';
import { EditorLayoutComponent } from './Layout/EditorLayout/EditorLayout.component';
import { MainPageComponent } from './Pages/MainPage/MainPage.component';
import { NotFound404PageComponent } from './Pages/NotFound404Page/NotFound404Page.component';
import { PageLayoutComponent } from './Layout/PageLayout/PageLayout.component';
import { PruebasPageComponent } from './Pages/PruebasPage/PruebasPage.component';

const routes: Routes = [
  { path: '', component: LoginLayoutComponent , children: [
    { path: '', component: LoginPageComponent },

  ]},

  { path: 'main', component : MainLayoutComponent, canActivate: [loginGuard], children: [
    { path: '', component: MainPageComponent },
  ]},


  // { path: 'pages', component: MainLayoutComponent, canActivate: [loginGuard] , children: [
  //   { path: '', component: PagePagesComponent }
  // ]},

  // { path: 'editor', component: EditorLayoutComponent, canActivate: [loginGuard], children:[
  //   { path: '', component: EditorPageComponent}
  // ]},
  { path: 'pruebas', component: PruebasPageComponent, canActivate: [loginGuard]},

  { path: '**', component: NotFound404PageComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
