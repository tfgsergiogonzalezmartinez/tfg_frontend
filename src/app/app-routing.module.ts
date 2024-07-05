import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './Layout/LoginLayout/LoginLayout.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { MainLayoutComponent } from './Layout/MainLayout/MainLayout.component';
import { loginGuard } from './Guards/Login.guard';
import { EditorLayoutComponent } from './Layout/EditorLayout/EditorLayout.component';
import { MainPageComponent } from './Pages/MainPage/MainPage.component';
import { NotFound404PageComponent } from './Pages/NotFound404Page/NotFound404Page.component';
import { PruebasPageComponent } from './Pages/PruebasPage/PruebasPage.component';
import { UserPageComponent } from './Pages/UserPage/UserPage.component';
import { EstilosComponent } from './Components/estilos/estilos.component';
import { AdministracionPageComponent } from './Pages/AdministracionPage/AdministracionPage.component';
import { adminGuard } from './Guards/Admin.guard';
import { SoportePageComponent } from './Pages/SoportePage/SoportePage.component';
import { ProyectosPageComponent } from './Pages/ProyectosPage/ProyectosPage.component';
import { DocumentacionPageComponent } from './Pages/DocumentacionPage/DocumentacionPage.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent , children: [
    { path: '', component: MainPageComponent },
  ]},
  { path: 'login', component: LoginLayoutComponent , children: [
    { path: '', component: LoginPageComponent },
  ]},

  { path: 'main', component : MainLayoutComponent, children: [
    { path: '', component: MainPageComponent },
    { path: 'settings', canActivate: [loginGuard], component: UserPageComponent },
    { path: 'administration', canActivate: [adminGuard], component: AdministracionPageComponent },
    { path: 'soporte', canActivate: [loginGuard], component: SoportePageComponent },
    { path: 'proyectos', canActivate: [loginGuard], component: ProyectosPageComponent },
    { path: 'documentacion', component: DocumentacionPageComponent },
  ]},





  // { path: 'pages', component: MainLayoutComponent, canActivate: [loginGuard] , children: [
  //   { path: '', component: PagePagesComponent }
  // ]},

  // { path: 'editor', component: EditorLayoutComponent, canActivate: [loginGuard], children:[
  //   { path: '', component: EditorPageComponent}
  // ]},
  { path: 'estilos', component: EstilosComponent, canActivate: [loginGuard]},
  { path: 'pruebas', component: PruebasPageComponent, canActivate: [loginGuard]},

  { path: '**', component: NotFound404PageComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
