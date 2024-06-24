import { Component, ElementRef, Host, HostListener, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../../../Services/User/User.service';

@Component({
  selector: 'app-UserProfileDropdown',
  templateUrl: './UserProfileDropdown.component.html',
  styleUrls: ['./UserProfileDropdown.component.css']
})
export class UserProfileDropdownComponent implements OnInit {
  @ViewChild('userDropDown') userDropDown!: ElementRef;

  Nombre: string = "";
  Apellido1: string = "";
  Email: string = "";


  user_dropDown: boolean = false;
  private listener_click_fuera!: () => void;


  constructor(private renderer2 : Renderer2, private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.Nombre = sessionStorage.getItem("Nombre") || "";
    this.Apellido1 = sessionStorage.getItem("Apellido1") || "";
    this.Email = sessionStorage.getItem("Email") || "";
  }


  toggle_userDropDown() {
    this.user_dropDown = !this.user_dropDown;
    this.toggleListener();
  }
  get_UserDropDown() {
    return this.user_dropDown;
  }
  set_UserDropDown(value: boolean) {
    this.user_dropDown = value;
    this.toggleListener();
  }

  clickout(event: any) {
    if (!this.user_dropDown) return;
    if (!this.userDropDown.nativeElement.contains(event.target)) {
      this.user_dropDown = false;
      this.toggleListener();
    }
  }

  toggleListener(){
    if (this.user_dropDown) {
      this.listener_click_fuera = this.renderer2.listen('document', 'click', (event) => this.clickout(event));
    }else{
      this.listener_click_fuera();
    }
  }

  goTo(route: string){
    if (route == "CerrarSesion") {
      this.userService.logout();
      this.router.navigate(['/']);
      return;
    }
    if (route == "Configuracion") {
      this.router.navigate(['/main/settings']);
      return;
    }
    if (route == "Login") {
      this.userService.setIsRegisterFromMain(false);
      this.router.navigate(['/login']);
      return;
    }
    if (route == "Register") {
      this.userService.setIsRegisterFromMain(true);
      this.router.navigate(['/login']);
      return;
    }
  }

  getService(){
    return this.userService;
  }


}
