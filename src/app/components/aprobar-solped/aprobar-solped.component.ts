import { Component, OnInit } from '@angular/core';
import { SolPedService } from 'src/app/services/sol-ped.service';
import { SolpedModelo } from 'src/app/models/solped';
import { SolPedDetalleService } from 'src/app/services/sol-ped-detalle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrazaSolpedService } from 'src/app/services/traza-solped.service';
import { TrazasSolped } from 'src/app/models/trazas-solped';
import { scan, map, tap } from 'rxjs/operators';


@Component({
	selector: 'app-aprobar-solped',
	templateUrl: './aprobar-solped.component.html',
	styleUrls: ['./aprobar-solped.component.scss'],
	providers: [MessageService, ConfirmationService]
})
export class AprobarSolpedComponent implements OnInit {

	solpeds: SolpedModelo[] = [];

	rolAprobarSOLPED = 'ROL-APROBAR-SOLPED'; //Rol para que sea o no visible el boton de asignación de una orden de compra

	solped: SolpedModelo = {};

	idGerencia: number = -1;
	idUsuario: number = -1;
	userAsignado: User = {};
	trabs_gerencia: User[] = [];

	idSolpedCompras: number = -1;

	mostrarDialogo: boolean = false;

	private estados = { "aprobado": 8, "enproceso": 6, "preorden": 7, "cerrado": 11, "enpresidencia": 8 };



	constructor(private svrSolped: SolPedService, private svrDetalles: SolPedDetalleService, private svrTrazasSolped: TrazaSolpedService,
		private svrUser: UserService, private messageService: MessageService, private confirmationService: ConfirmationService,
		private route: ActivatedRoute, private router: Router) { }


	ngOnInit() {
		this.idGerencia = JSON.parse(sessionStorage.getItem('currentUser')).idGerencia;
		this.idUsuario = JSON.parse(sessionStorage.getItem('currentUser')).idSegUsuario;
		//this.verAsignar = ((JSON.parse(localStorage.getItem('roles')).find(rol => rol.codigo == this.rolAprobarSOLPED)) != null ? true : false);

	 /* 	this.svrSolped.solped$.subscribe((data) => {
			this.idSolpedCompras = data.idSolpedCompras;
			//console.log("subs ",data.idSolpedCompras )
		})  */
		this.cargardata();
	}

	async cargardata() {
		this.solpeds = await this.svrSolped.getMisSolPedsPresindencia(); //this.svrSolped.getTodosP();
		this.solpeds.forEach(async sol => {
			this.svrSolped.getDataObsverver(sol.idSolpedCompras);
			//this.svrSolped.solped$.pipe(map(data=>console.log(data))).subscribe((result)=>console.log("result: ", result));
		}); 
	}


	
	aprobarSOLPED(solped: SolpedModelo) {
		//this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);

		this.confirmationService.confirm({
			message: `¿Seguro desea Aprobar la Solicitud nro: ${solped.idSolpedCompras}`,
			accept: async () => {
				await this.svrSolped.cambiarFase({
					idSolpedCompras: this.solped.idSolpedCompras,
					idEstadoActual: this.estados.aprobado,
					estadoActual: Object.keys(this.estados)[0]
				});
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'Solped Aprobada Satisfactoriamente' });
			}
		});


	}

	revisar(solped: SolpedModelo) {

		this.confirmationService.confirm({
			message: `¿Esta seguro de mandar a revisión la Solicitud nro : ${solped.idSolpedCompras}`,
			accept: async () => {
				await this.svrSolped.cambiarFase({
					idSolpedCompras: this.solped.idSolpedCompras,
					idEstadoActual: this.estados.aprobado,
					estadoActual: Object.keys(this.estados)[1]
				});
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'Solped Aprobada Satisfactoriamente' });
			}
		});
	}

}
