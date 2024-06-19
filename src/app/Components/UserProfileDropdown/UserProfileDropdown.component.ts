import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-UserProfileDropdown',
  templateUrl: './UserProfileDropdown.component.html',
  styleUrls: ['./UserProfileDropdown.component.css']
})
export class UserProfileDropdownComponent implements OnInit {

  Nombre : string = "";
  Apellido1 : string = "";
  Email : string = "";


  user_dropDown : boolean = false;

  constructor() { }

  ngOnInit() {
    this.Nombre= sessionStorage.getItem("Nombre") || "";
    this.Apellido1= sessionStorage.getItem("Apellido1") || "";
    this.Email= sessionStorage.getItem("Email") || "";
  }


  toggle_userDropDown(){
    this.user_dropDown = !this.user_dropDown;
  }
  get_UserDropDown(){
    return this.user_dropDown;
  }
  set_UserDropDown(value : boolean){
    this.user_dropDown = value;
  }

}
