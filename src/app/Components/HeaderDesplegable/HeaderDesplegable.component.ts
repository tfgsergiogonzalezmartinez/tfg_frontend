import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { MenuDesplegable } from '../../../../Interfaces/Header/menuDesplegable';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../Services/User/User.service';
import { adminGuard } from '../../Guards/Admin.guard';

@Component({
  selector: 'app-HeaderDesplegable',
  templateUrl: './HeaderDesplegable.component.html',
  styleUrls: ['./HeaderDesplegable.component.css']
})
export class HeaderDesplegableComponent implements OnInit {
  @Input() MenuDesplegable! : MenuDesplegable;
  @Output() submenusEmiter : EventEmitter<MenuDesplegable[]> = new EventEmitter<MenuDesplegable[]>();
  open : boolean = false;
  constructor(private router: Router, private userService : UserService) { }

  ngOnInit() {
  }

  toggle(){
    this.open = !this.open;
  }
  setOpen(estado:boolean){
    this.open = estado;
  }
  goTo(ruta:string){
    this.router.navigate([ruta]);
  }

  ComprobarRoles(){
    if (this.MenuDesplegable.Rol == "all") return true;
    if (this.MenuDesplegable.Rol == "admin") return this.userService.isAdmin();
    if (this.MenuDesplegable.Rol == "user") return this.userService.isLogin();
    return true;
  }

}
