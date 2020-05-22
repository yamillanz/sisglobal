import { Component, OnInit } from '@angular/core';
import { NoticiaModelo } from '../../models/index';
import { NoticiasService } from 'src/app/services/noticias.service';
import {Message} from 'primeng/api';
import {TsTicketServicioService} from "../../services/ts-ticket-servicio.service";


@Component({
  selector: 'noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticiasService]
})
export class NoticiasComponent implements OnInit {

  noticias: NoticiaModelo[] = [];
  msgs: Message[] = [];

  noticia:NoticiaModelo;

  constructor(private srvNotic : NoticiasService, private srv : TsTicketServicioService) { }

  ngOnInit() {
    this.srvNotic.getAllPublico().subscribe(data => {this.getNoticias(data);},error => {console.log(error);});
  }

  private getNoticias(data) {
    this.msgs = [];
    if(!data) {
      this.msgs.push({severity:'error', summary:'ERROR', detail:'No hay noticias que mostrar'});
      return;
    }
    this.noticias = data;
  }


}
