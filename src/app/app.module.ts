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
import { ChatComponent } from './Components/chat/chat.component';
import { BuscadorUsuariosComponent } from './Components/BuscadorUsuarios/BuscadorUsuarios.component';
import { SoportePageComponent } from './Pages/SoportePage/SoportePage.component';
import { ProyectosPageComponent } from './Pages/ProyectosPage/ProyectosPage.component';
import { ProyectoCardComponent } from './Components/proyectoCard/proyectoCard.component';
import { PlantillaCardComponent } from './Components/plantillaCard/plantillaCard.component';
import { ImportarBaseDatosComponent } from './Components/ImportarBaseDatos/ImportarBaseDatos.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { TruncarPipe } from '../../pipes/Truncar.pipe';
import { DocumentacionPageComponent } from './Pages/DocumentacionPage/DocumentacionPage.component';
import { BuscadorComponent } from './Components/Buscador/Buscador.component';
import { BoldSearchTermDirective } from '../../directives/BoldSearchTerm.directive';
import { TooltipComponent } from './Components/Tooltip/Tooltip.component';


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
    ToggleModeComponent,
    ChatComponent,
    BuscadorUsuariosComponent,
    SoportePageComponent,
    ProyectosPageComponent,
    ProyectoCardComponent,
    PlantillaCardComponent,
    ImportarBaseDatosComponent,
    TruncarPipe,
    DocumentacionPageComponent,
    BuscadorComponent,
    BoldSearchTermDirective,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //para los ngmodule
    HttpClientModule, //para los inject
    ColorPickerModule

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
