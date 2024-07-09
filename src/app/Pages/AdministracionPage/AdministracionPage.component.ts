import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { UserService } from '../../../../Services/User/User.service';
import { UserModificarRolDto } from '../../../../dto/UserDto/UserModificarRolDto';

@Component({
  selector: 'app-AdministracionPage',
  templateUrl: './AdministracionPage.component.html',
  styleUrls: ['./AdministracionPage.component.css']
})
export class AdministracionPageComponent implements OnInit {
  columns: string[] = [
    'Email',
    'Nombre',
    'Primer Apellido',
    'Segundo Apellido',
    'Rol',
  ];

  listaCambios : UserGetDto[] = [];


  isModalOpen: boolean = false;
  rowSelected: any | null = null;
  datosTabla: UserGetDto[] = [];

  constructor(private mainService : MainService, private userService : UserService) { }

  ngOnInit() {

    this.userService.GetAll().subscribe({
      next: data => {
        this.datosTabla = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getService(){
    return this.mainService;
  }
  public clickRow(row : any){
    // this.tableService.setRowSelected(row);
    console.log(row);
  }

  public cambiarRol(row : any){
    if (this.listaCambios.includes(row)) return;
    this.listaCambios.push(row);
  }

  public guardarCambios(){
    this.listaCambios.forEach(element => {
      let userModificarRol : UserModificarRolDto = {
        Email: element.Email,
        Rol: element.Rol
      }
      this.userService.ModificarRol(userModificarRol).subscribe({
        next: data => {
          console.log("Usuario actualizado con éxito");
          this.mainService.setIcono("check");
          this.mainService.setMensaje("Roles actualizados con exito.");
          this.mainService.activarMensaje();
        },
        error: error => {
          console.log(error);
        }
      });
    });
  }
}
