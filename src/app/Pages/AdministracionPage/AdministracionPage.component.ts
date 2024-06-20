import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../Services/Main/Main.service';

@Component({
  selector: 'app-AdministracionPage',
  templateUrl: './AdministracionPage.component.html',
  styleUrls: ['./AdministracionPage.component.css']
})
export class AdministracionPageComponent implements OnInit {
  columns: string[] = [
    'Envio',
    'Referencia',
    'Fecha',
    'Destinatario',
    'Dirección',
    'CP',
    'Destino',
    'Servicio',
    'Estado',
    'INC',
    'IMG',

  ];


  isModalOpen: boolean = false;
  rowSelected: any | null = null;
  data: any[] = [
    { Envio: '123456', Referencia: 'ABC123', Fecha: '2023-06-01', Destinatario: 'John Doe', Dirección: '123 Main St', CP: '12345', Destino: 'City A', Servicio: 'Express', Estado: 'Pendiente', INC: 'N/A', IMG: 'image1.png' },
    { Envio: '654321', Referencia: 'DEF456', Fecha: '2023-06-02', Destinatario: 'Jane Smith', Dirección: '456 Elm St', CP: '54321', Destino: 'City B', Servicio: 'Standard', Estado: 'En Proceso', INC: 'N/A', IMG: 'image2.png' },
    { Envio: '789012', Referencia: 'GHI789', Fecha: '2023-06-03', Destinatario: 'Alice Johnson', Dirección: '789 Oak St', CP: '67890', Destino: 'City C', Servicio: 'Overnight', Estado: 'Completado', INC: 'N/A', IMG: 'image3.png' },
    { Envio: '210987', Referencia: 'JKL012', Fecha: '2023-06-04', Destinatario: 'Bob Brown', Dirección: '321 Pine St', CP: '98765', Destino: 'City D', Servicio: 'Economy', Estado: 'Cancelado', INC: 'N/A', IMG: 'image4.png' }
  ];
  constructor(private mainService : MainService) { }

  ngOnInit() {
  }

  getService(){
    return this.mainService;
  }
  public clickRow(row : any){
    // this.tableService.setRowSelected(row);
    console.log(row);
  }
}
