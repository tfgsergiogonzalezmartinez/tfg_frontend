import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './Layout/MainLayout/MainLayout.component';
import { LoginLayoutComponent } from './Layout/LoginLayout/LoginLayout.component';
import { MainPageComponent } from './Pages/MainPage/MainPage.component';
import { LoginPageComponent } from './Pages/LoginPage/LoginPage.component';
import { HeaderComponent } from './Components/Header/Header.component';
import { FooterComponent } from './Components/Footer/Footer.component';

import { EditorLayoutComponent } from './Layout/EditorLayout/EditorLayout.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageLayoutComponent } from './Layout/PageLayout/PageLayout.component';
import { PruebasPageComponent } from './Pages/PruebasPage/PruebasPage.component';
import { HeaderDesplegableComponent } from './Components/HeaderDesplegable/HeaderDesplegable.component';
import { SubMenuComponent } from './Components/SubMenu/SubMenu.component';
import { UserAvatarComponent } from './Components/UserAvatar/UserAvatar.component';
import { UserProfileDropdownComponent } from './Components/UserProfileDropdown/UserProfileDropdown.component';
import { UserPageComponent } from './Pages/UserPage/UserPage.component';
import { InputFormComponent } from './Components/inputForm/inputForm.component';
import { ModalComponent } from './Components/modal/modal.component';
import { EstilosComponent } from './Components/estilos/estilos.component';
import { AdministracionPageComponent } from './Pages/AdministracionPage/AdministracionPage.component';
import { ToggleModeComponent } from './Components/ToggleMode/ToggleMode.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    EditorLayoutComponent,
    MainPageComponent,
    LoginPageComponent,
    HeaderComponent,
    FooterComponent,
    PageLayoutComponent,
    PruebasPageComponent,
    HeaderDesplegableComponent,
    SubMenuComponent,
    UserAvatarComponent,
    UserProfileDropdownComponent,
    UserPageComponent,
    InputFormComponent,
    ModalComponent,
    EstilosComponent, //quitar, es de pruebas
    AdministracionPageComponent,
    ToggleModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //para los ngmodule y asi
    HttpClientModule //para los inject
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
