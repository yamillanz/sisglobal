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


@Component({
	selector: 'app-solped-oc',
	templateUrl: './solped-oc.component.html',
	styleUrls: ['./solped-oc.component.scss'],
	providers: [ConfirmationService, MessageService]
})
export class SolpedOCComponent implements OnInit {

	solpeds: SolpedModelo[] = [];

	private estadoAsignado = {nro: 5, nombre: "Asignado"};

	rolAsignarOC = 'ROL-ASIG-OC'; //Rol para que sea o no visible el boton de asignación de una orden de compra

	solped: SolpedModelo = {};

	idGerencia : number = -1;
	idUsuario : number = -1;
	userAsignado : User  = {};
	trabs_gerencia: User[] = [];

	mostrarDialogo : boolean = false;
	verAsignar : boolean = false;
	mostrarTodo : boolean = false;

	constructor(private svrSolped: SolPedService, private svrDetalles : SolPedDetalleService, private svrTrazasSolped : TrazaSolpedService,
				private svrUser : UserService, private messageService: MessageService,
				private route : ActivatedRoute, private router : Router) { }

				
	 ngOnInit() {
		this.idGerencia = JSON.parse(sessionStorage.getItem('currentUser')).idGerencia;
		this.idUsuario = JSON.parse(sessionStorage.getItem('currentUser')).idSegUsuario;
		this.verAsignar = ((JSON.parse(localStorage.getItem('roles')).find(rol => rol.codigo == this.rolAsignarOC)) != null ? true : false);
		this.mostrarTodo = this.verAsignar;


		this.cargardata();
		//this.solped_detalles = await this.svrDetalles.
	}

	async cargardata(){
		this.solpeds = await (this.mostrarTodo ? this.svrSolped.getTodosP() : this.svrSolped.getMisSolPeds(this.idUsuario)); //this.svrSolped.getTodosP();
	}

	mostrarAsignacion(solped : SolpedModelo){
		this.userAsignado = {};
		this.solped = solped;
		this.svrUser.getPorGerencias(this.idGerencia).then((data) => {
			this.trabs_gerencia = data; 
			//console.log("Busco: ", this.trabs_gerencia);
			this.mostrarDialogo = true;
			/* if (solped.idSegUsuario) {
				this.userAsignado.idSegUsuario = solped.idSegUsuario;
			} */

        });
	}

	async asignar(solped : SolpedModelo){
		//console.log("asignado: ", this.userAsignado);
		//return false;
		if (!this.userAsignado) {
			this.messageService.clear();
			this.messageService.add({ key: 'tc', severity: 'success', summary: 'Seleccione un usuario' });
			return false;
		}

		this.solped.estadoActual = this.estadoAsignado.nombre;
		this.solped.idEstadoActual = this.estadoAsignado.nro;
		this.solped.idSegUsuario = this.userAsignado.idSegUsuario;		//
		await this.svrSolped.asignarSolped(this.solped);


		this.solped.nombre_asignado = this.userAsignado.nombre_completo;
		
		const newtraza : TrazasSolped = {
			justificacion: "Asignado a usuario: " + this.userAsignado.nombre_completo,
			idSegUsuario: this.idUsuario,
			idEstadoSolped: this.estadoAsignado.nro,  // estado asignado
			estadoActual: this.estadoAsignado.nombre,
			estadoAnterior: "Aprobado",
			idSolpedCompras: this.solped.idSolpedCompras
		}; 
		await this.svrTrazasSolped.insertTraza(newtraza);


		//this.cargardata();
		this.messageService.clear();
		this.messageService.add({ key: 'tc', severity: 'success', summary: 'Asignación Satisfactoria' });
		this.cerrarDialogo();
		this.userAsignado = {};

	}

	fases(solped : SolpedModelo){
		this.router.navigate(["fases-solped", solped.idSolpedCompras]);
	}

	cerrarDialogo(){
		this.mostrarDialogo = false;
		this.userAsignado = {};
	}

}
