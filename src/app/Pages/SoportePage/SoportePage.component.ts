import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../Services/User/User.service';
import { MainService } from '../../../../Services/Main/Main.service';
import { ChatUsuariosBuscados } from '../../../../Interfaces/Chat/ChatUsuariosBuscados';
import { UserGetDto } from '../../../../dto/UserDto/UserGetDto';
import { SoporteService } from '../../../../Services/Soporte/Soporte.service';
import { ChatMessage } from '../../../../Interfaces/Chat/ChatMessage';
import { PeticionSoporteGetDto } from '../../../../dto/SoporteDto/PeticionSoporteGetDto';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatService } from '../../../../Services/Chat/Chat.service';

@Component({
  selector: 'app-SoportePage',
  templateUrl: './SoportePage.component.html',
  styleUrls: ['./SoportePage.component.css']
})
export class SoportePageComponent implements OnInit {
  @ViewChild('chat') chatHtml!: ElementRef;
  tipoComunicacion: string = "Soporte";
  listaPeticionesAbiertas : ChatUsuariosBuscados[] = [];
  listaPeticionesCerradas : ChatUsuariosBuscados[] = [];
  otroUsuarioChat! : ChatUsuariosBuscados | null;
  listaConversacion: ChatMessage[] = [];
  currentImage: string = "";
  inputMensaje: string = "";
  isNuevaPeticion : boolean = false;

  intervalorActualizador :  any;
  //Datos nueva peticion
  Asunto : string = "";
  Descripcion : string = "";



  constructor(private userService : UserService, private mainService : MainService,
    private soporteService : SoporteService, private chatService : ChatService, private cdr : ChangeDetectorRef ) { }

  ngOnInit() {
    this.iniciarConexionSoporte();

    this.obtenerPeticiones();
    this.intervalorActualizador = setInterval(() => {
      this.obtenerPeticiones();
    }, 30000);

    this.CargarFotoUsuario(sessionStorage.getItem('Id')!);

  }

  obtenerPeticiones(){
    if (this.userService.isAdmin()) {
      this.cargarPeticiones();
    } else {
      this.cargarPeticionesUsuario();
    }
  }

  iniciarConexionSoporte(){
    this.chatService.getHubConnection().on("mensajePrivadoSoporte", (message: ChatMessage) => this.recibirMensaje_privado(message));
  }

  private recibirMensaje_privado(message: ChatMessage) {
    if (message.usuario == sessionStorage.getItem('Id')) return;
    this.mainService.setIcono("support_agent");
    this.mainService.setMensaje("Nuevo mensaje del soporte.");
    this.mainService.activarMensaje();
    this.scrollHastaAbajo();
    if (this.otroUsuarioChat && this.otroUsuarioChat.Peticion!.Id != message.grupo) return
    this.listaConversacion.push(message);
  }

  scrollHastaAbajo() {
    this.cdr.detectChanges();
    this.chatHtml.nativeElement.scrollTop = this.chatHtml.nativeElement.scrollHeight;
  }


  CargarFotoUsuario(idUsuario: string){
    this.userService.getFotoAvatar(idUsuario).subscribe({
      next: data => {
        this.currentImage = data.Imagen;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  nuevaPeticion(){
    this.isNuevaPeticion = true;

  }
  enviarPeticion(){
    this.soporteService.NuevaPeticion(this.Asunto, this.Descripcion, sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        this.mainService.setIcono("check");
        this.mainService.setMensaje("Petición de soporte enviada con éxito.");
        this.mainService.activarMensaje();
        this.isNuevaPeticion = false;
        this.Asunto = "";
        this.Descripcion = "";
        this.cargarPeticionesUsuario();
      },
      error: error => {
        console.log(error);
      }
    });
  }
  cancelarPeticion(){
    this.isNuevaPeticion = false;
    this.Asunto = "";
    this.Descripcion = "";
  }



  getUserService(){
    return this.userService;
  }
  getService(){
    return this.mainService;
  }

  cargarPeticiones(){
    this.listaPeticionesAbiertas = [];
    this.listaPeticionesCerradas = [];
    this.soporteService.GetPeticionesAbiertas().subscribe({
      next: data => {
        for (const peticion of data){
          this.cargarUsuario(peticion);
        }

      },
      error: error => {
        console.log(error);
      }

    });

  }

  cargarPeticionesUsuario(){
    this.listaPeticionesAbiertas = [];
    this.listaPeticionesCerradas = [];
    this.soporteService.GetPeticionByUsuario(sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        for (const peticion of data){
          this.cargarUsuario(peticion);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }


  cargarUsuario(peticion : PeticionSoporteGetDto) {
    this.userService.GetById(peticion.UsuarioPeticionario).subscribe({
      next: user => {
        const userdto : UserGetDto = user;
        this.userService.getFotoAvatar(user.Id).subscribe({
          next: data => {
            const UserBuscado : ChatUsuariosBuscados = {
              User: userdto,
              Imagen: data.Imagen,
              MensajesNoLeidos: 0,
              Peticion: peticion,
              MostrarOpciones: false
            };
            if (peticion.Abierta) this.listaPeticionesAbiertas.push(UserBuscado);
            if (!peticion.Abierta) this.listaPeticionesCerradas.push(UserBuscado);
            console.log(this.listaPeticionesAbiertas);
          },
          error: error => {
            console.log(error);
          }
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getCurrentID(){
    return sessionStorage.getItem('Id');
  }

  seleccionarConversacion(user: ChatUsuariosBuscados){

    this.otroUsuarioChat = user;
    this.listaConversacion = [];
    this.soporteService.GetById(this.otroUsuarioChat.Peticion!.Id).subscribe({
      next : data =>{
        this.otroUsuarioChat!.Peticion = data;
        for (const mensaje of this.otroUsuarioChat!.Peticion!.Mensajes){
          this.listaConversacion.push({
            mensaje: mensaje.Msg,
            usuario: mensaje.UserId,
          });
        }
      },
      error : error =>{
        console.log(error);
      }
    });
    this.chatService.getHubConnection().invoke('onUnirGrupo',this.otroUsuarioChat.Peticion!.Id);


  }

  enviarMensaje() {
    if (this.inputMensaje == '') return;
    const newMessage: ChatMessage = {
      mensaje: this.inputMensaje,
      usuario: sessionStorage.getItem('Id')!,
      grupo: this.otroUsuarioChat!.Peticion!.Id,
      destinatario: this.otroUsuarioChat!.User.Id
    };

    this.chatService.getHubConnection().invoke('onEnviarMensajeDirectoSoporte', this.otroUsuarioChat!.Peticion?.Id, newMessage)
      .then(() => {
        this.listaConversacion.push(newMessage);
        this.inputMensaje = '';
        this.scrollHastaAbajo();
      })
      .catch(err => console.error('Send Message Error: ', err));
  }

  toggleMostrarOpcionesPeticion(event : Event, peticion : ChatUsuariosBuscados){
    peticion.MostrarOpciones = !peticion.MostrarOpciones;
    if (peticion.MostrarOpciones){
      this.listaPeticionesAbiertas.forEach(x => {
        if (x.User.Id != peticion.User.Id){
          x.MostrarOpciones = false;
        }
      });
    }
    event?.stopPropagation();
  }

  cerrarPeticion(event : Event, peticion : ChatUsuariosBuscados){
    event?.stopPropagation();
    this.soporteService.CerrarPeticion(peticion.Peticion!.Id, sessionStorage.getItem('Id')!).subscribe({
      next: data => {
        this.listaPeticionesAbiertas = this.listaPeticionesAbiertas.filter(x => x.Peticion?.Id != peticion.Peticion?.Id);
        this.listaConversacion = [];
        this.otroUsuarioChat = null;
      }
    });
  }


}
