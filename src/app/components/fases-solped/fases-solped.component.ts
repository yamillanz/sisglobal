import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { TrazasSolped } from 'src/app/models/trazas-solped';
import { TrazaSolpedService } from 'src/app/services/traza-solped.service';
import { TsTrazaTrazaService } from 'src/app/services/ts-traza-ticket.service';
import { ProveedoresComprasService } from "../../services/proveedores-compras.service"

import { SolPedService } from 'src/app/services/sol-ped.service';
import { SolpedModelo } from 'src/app/models/solped';
import { EstadosSolpedModelo } from 'src/app/models/estados-solped';
import { EstadosSolpepService } from 'src/app/services/estados-solpep.service';
import { ProveedorModelo } from 'src/app/models/proveedor-modelo';
import { SolPedDetalleService } from 'src/app/services/sol-ped-detalle.service';
import { SolpedDetalleModelo } from 'src/app/models/solped-detalle';
import { TrazaTicketServicio } from 'src/app/models/traza-ticket-servicio';


@Component({
	selector: 'app-fases-solped',
	templateUrl: './fases-solped.component.html',
	providers: [MessageService, ConfirmationService],
	styleUrls: ['./fases-solped.component.scss'],
	encapsulation: ViewEncapsulation.None //Lo necesitaba para mostrar el componente "steps" de primeng distrbuido en la pantalla
})
export class FasesSolpedComponent implements OnInit, OnChanges {

	idSolpedCompras: number = -1;
	pasos: MenuItem[];
	colsPreOC: any[];
	activeIndex: number = 0;
	idGerencia: number = -1;
	idUsuario: number = -1;
	verAsignar: boolean = false;
	disPreCompra: boolean = false;
	lockFases: boolean = false;

	vieneAnterior: number = -1;

	observacion: string = "";
	rolAsignarOC = 'ROL-ASIG-OC';

	solped: SolpedModelo = {};
	estadosSolped: EstadosSolpedModelo[] = [];
	proveedores: ProveedorModelo[] = [];
	detallePreOC: SolpedDetalleModelo[] = [];
	proveedorSelect: ProveedorModelo = {};
	detalleSolpedNota: SolpedDetalleModelo = {};

	altoTabla: string = "";

	estadoAprobadoTicket  = {id: 4, nombre: "Aprobado"};

	private estados = { "asignado": 5, "enproceso": 6, "preorden": 7, "cerrado": 11, "enpresidencia": 8 };
	displayDialogoDet: boolean = false;
	tituloInsert: string;

	constructor(private route: ActivatedRoute, private router: Router,
		private svrTrazasSolped: TrazaSolpedService, private svrSolped: SolPedService,
		private svrEstadoSolped: EstadosSolpepService, private svrDetallesSol: SolPedDetalleService,
		private messageService: MessageService, private svrProveedores: ProveedoresComprasService,
		private svrTraza : TsTrazaTrazaService) {


	}
	async ngOnChanges() {
		//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
	}


	async ngOnInit() {
		this.idGerencia =  JSON.parse(sessionStorage.getItem('currentUser')).idGerencia;
		this.idUsuario =  JSON.parse(sessionStorage.getItem('currentUser')).idSegUsuario;
		this.idSolpedCompras =  Number.parseInt( this.route.snapshot.paramMap.get("idSolpedCompras"));
		this.verAsignar = ((JSON.parse(localStorage.getItem('roles')).find(rol => rol.codigo == this.rolAsignarOC)) != null ? true : false);

		await this.svrSolped.getDataObsverver(this.idSolpedCompras);
		await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);

		this.estadosSolped = await this.svrEstadoSolped.getAll();
		//console.log("estados: ", this.estadosSolped);

		this.svrSolped.solped$.subscribe((data) => {
			this.solped = data;
		});

		this.construirEtapas();

		//console.log("Estado: ", this.solped.idEstadoActual);

		switch (this.solped.idEstadoActual) {
			case 5:
				this.activeIndex = 0;
				break;
			case 6:
				this.activeIndex = 1;
				break;
			case 7:
				this.activeIndex = 2;
				break;
			case 11:
				this.activeIndex = 3;
				break;
			case 8:
				this.activeIndex = 4;
				break;

			default:
				break;
		}


			this.colsPreOC = [
				{ field: 'notas', header: 'Notas', witdh: "3%" },
				{ field: 'codigo', header: 'Codigo', witdh: "10%" },
				{ field: 'nombre', header: 'Nombre', witdh: "20%" },
				{ field: 'fechaRequerida', header: 'Fecha Req', witdh: "5%" },
				{ field: 'nombre_activo', header: 'Proposito', witdh: "10%" },
				{ field: 'cantidad', header: 'Cant', witdh: "5%" },
				{ field: 'cant_encontrada', header: 'Encon', witdh: "5%" },
				{ field: 'idProveeor', header: 'Provee', witdh: "17%" },
				{ field: 'precio', header: 'Precio (BsS)', witdh: "10%" }
	
			];
	}

	construirEtapas() {

		this.pasos = [
			{
				label: "Asignado",
				command: (event: any) => {
					this.activeIndex = 0;
					this.cambiarFase();
					this.disPreCompra = false;
				}
			},
			{
				label: "En proceso",
				command: (event: any) => {
					this.activeIndex = 1;
					this.cambiarFase();
					this.disPreCompra = false;
				}
			},
			{
				label: "PreOrden",
				command: (event: any) => {
					this.activeIndex = 2;
					this.cambiarFase();
					this.disPreCompra = false;
				}
			},
			{
				label: "Cerrada PreOC",
				command: (event: any) => {
					this.activeIndex = 3;
					this.cambiarFase();
					this.disPreCompra = true;
				}
			}
		];

		this.lockFases = ((this.solped.idEstadoActual == this.estados.cerrado) && (!this.verAsignar))
		/* console.log("Actual:", this.solped.idEstadoActual); */
		if ((this.solped.idEstadoActual == this.estados.cerrado) && (this.verAsignar)) {
			this.pasos.push({
				label: "En Presidencia",
				command: (event: any) => {
					this.activeIndex = 4;
					this.cambiarFase();
					this.disPreCompra = true;
				}
			});
			/* console.log("Entro", this.pasos); */
		}

		//this.pasos = [];
	}

	async cambiarFase() {
		//console.log("fase ", this.activeIndex);
		let idEstadoActual = -1;
		let estadoActual = "";

		let newtraza: TrazasSolped = {
			justificacion: (this.observacion == "" || !this.observacion ? "Cambio de Fase" : this.observacion),
			idSegUsuario: this.idUsuario,
			//idEstadoSolped: this.estadoAsignado.nro,  // estado asignado
			//estadoActual: this.estadoAsignado.nombre,
			//estadoAnterior: "Aprobado",
			idSolpedCompras: this.idSolpedCompras
		};

		let newTrazaTicket : TrazaTicketServicio = {
			idTicketServicio : this.solped.idTicketServicio,
			justificacion : "Cambio de fase en SOLPED nro " + this.solped.idSolpedCompras,
			idEstadoTicket : this.estadoAprobadoTicket.id,
			estadoAnterior : this.estadoAprobadoTicket.nombre,
			idSegUsuario : this.idUsuario
		}

		//console.log("traza del ticket", newTrazaTicket);

		switch (this.activeIndex) {
			case 0:
				if (this.vieneAnterior == 1) {
					idEstadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.asignado }))[0].idComprasEstadosSolped; //this.estados.enproceso; 5;
					estadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.asignado }))[0].nombre;//"Asignado";
					newtraza.idEstadoSolped = idEstadoActual;
					newtraza.estadoActual = estadoActual
					newtraza.estadoAnterior = "Aprobado";
					this.solped.idEstadoActual = idEstadoActual; // 5; //CAMBIARRRRRRR
					//await this.svrTrazasSolped.insertTraza(newtraza);
					//await this.svrSolped.cambiarFase({ idSolpedCompras: this.solped.idSolpedCompras, idEstadoActual: idEstadoActual, estadoActual: estadoActual });
					//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
					//await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);
					//console.log("traza en: ", newtraza);
					newTrazaTicket.justificacion += " a " + estadoActual + " - Justificacion: " + newtraza.justificacion;
					this.svrTraza.nuevoTrazaP(newTrazaTicket).then(()=>{console.log()});
				}
				break;
			case 1: // EN PROCESO
				//if (this.vieneAnterior == 1) {
				this.vieneAnterior = 1;
				idEstadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.enproceso }))[0].idComprasEstadosSolped; //this.estados.enproceso; 
				estadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.enproceso }))[0].nombre;
				newtraza.idEstadoSolped = idEstadoActual;
				newtraza.estadoActual = estadoActual;
				newtraza.estadoAnterior = "Asignado";
				this.solped.idEstadoActual = idEstadoActual; //6; //CAMBIARRRRRRR
				//await this.svrTrazasSolped.insertTraza(newtraza);
				//await this.svrSolped.cambiarFase({ idSolpedCompras: this.solped.idSolpedCompras, idEstadoActual: idEstadoActual, estadoActual: estadoActual });
				//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
				//await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);
				newTrazaTicket.justificacion += " a " + estadoActual + " - Justificacion: " + newtraza.justificacion;
				this.svrTraza.nuevoTrazaP(newTrazaTicket).then(()=>{console.log()});
				break;
			//}
			case 2: // PREORDEN
				this.vieneAnterior = 1;
				idEstadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.preorden }))[0].idComprasEstadosSolped; //this.estados.enproceso; 
				estadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.preorden }))[0].nombre;
				newtraza.idEstadoSolped = idEstadoActual;
				newtraza.estadoActual = estadoActual;
				newtraza.estadoAnterior = "En Proceso";
				this.solped.idEstadoActual = idEstadoActual; //7;//CAMBIARRRRRRR
				this.proveedores = await this.svrProveedores.getAll();
				this.svrDetallesSol.getDetalleDetSolpedP(this.idSolpedCompras).then((data) => {
					this.detallePreOC = data;
					//this.altoTabla = String(data.length * 200) + "px"; //Number.toString((data.length * 3)) 
					//console.log("alto: ", this.altoTabla);
				});
				//await this.svrTrazasSolped.insertTraza(newtraza);
				//await this.svrSolped.cambiarFase({ idSolpedCompras: this.solped.idSolpedCompras, idEstadoActual: idEstadoActual, estadoActual: estadoActual });
				//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
				//await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);
				newTrazaTicket.justificacion += " a " + estadoActual + " - Justificacion: " + newtraza.justificacion;
				this.svrTraza.nuevoTrazaP(newTrazaTicket).then(()=>{});
				break;
			case 3: //Cerrado preorden
				this.vieneAnterior = 1;
				idEstadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.cerrado }))[0].idComprasEstadosSolped; //this.estados.enproceso; 
				estadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.cerrado }))[0].nombre;
				newtraza.idEstadoSolped = idEstadoActual;
				newtraza.estadoActual = estadoActual;
				newtraza.estadoAnterior = "Pre Orden OC";
				this.solped.idEstadoActual = idEstadoActual; //11;//CAMBIARRRRRRR
				

				//await this.svrTrazasSolped.insertTraza(newtraza);
				//await this.svrSolped.cambiarFase({ idSolpedCompras: this.solped.idSolpedCompras, idEstadoActual: idEstadoActual, estadoActual: estadoActual });
				//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
				//await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);
				/* this.detallePreOC.forEach(async (det :SolpedDetalleModelo) => {
					await this.svrDetallesSol.updateDetSolped(det);
				}); */
				newTrazaTicket.justificacion += " a " + estadoActual + " - Justificacion: " + newtraza.justificacion;
				this.svrTraza.nuevoTrazaP(newTrazaTicket).then(()=>{});

				this.construirEtapas();
				break;

			case 4: //En presidencia
				this.vieneAnterior = 1;
				idEstadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.enpresidencia }))[0].idComprasEstadosSolped; //this.estados.enproceso; 
				estadoActual = (this.estadosSolped.filter((estado) => { return estado.idComprasEstadosSolped == this.estados.enpresidencia }))[0].nombre;
				newtraza.idEstadoSolped = idEstadoActual;
				newtraza.estadoActual = estadoActual;
				newtraza.estadoAnterior = "Cerrado PreOC";
				this.solped.idEstadoActual = idEstadoActual; //7;//CAMBIARRRRRRR
				
				/* 	this.svrDetallesSol.getDetalleDetSolpedP(this.idSolpedCompras).then((data) => {
						this.detallePreOC = data;
					}); */
				//await this.svrTrazasSolped.insertTraza(newtraza);
				//await this.svrSolped.cambiarFase({ idSolpedCompras: this.solped.idSolpedCompras, idEstadoActual: idEstadoActual, estadoActual: estadoActual });
				//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
				//await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);
				newTrazaTicket.justificacion += " a " + estadoActual + " - Justificacion: " + newtraza.justificacion;
				this.svrTraza.nuevoTrazaP(newTrazaTicket).then(()=>{});
				break;
			default:
				break;
		}

	}

	volver() {
		this.router.navigate(["solpedsoc"]);
	}

	async registrarObservacion() {

		let newtraza: TrazasSolped = {
			justificacion: this.observacion,
			idSegUsuario: this.idUsuario,
			idEstadoSolped: this.solped.idEstadoActual,
			estadoActual: this.solped.estadoActual,
			estadoAnterior: this.solped.estadoActual,
			idSolpedCompras: this.idSolpedCompras
		};

		await this.svrTrazasSolped.insertTraza(newtraza);
		await this.svrTrazasSolped.notificarCambio(this.idSolpedCompras);
		this.messageService.clear();
		this.messageService.add({ key: 'tc', severity: 'success', summary: 'Observación Insertada' });
		this.observacion = "";

	}

	selecProvee(e, detalle: SolpedDetalleModelo) {
		console.log("Evento: ", e);
		//detalle.idProveedor = e.value.idProveedor;
		this.detalleSolpedNota.idProveedor = e.value.idProveedor;
		this.detalleSolpedNota.nombre_proveedor = e.value.nombre;
		console.log("Como quedo: ", this.detalleSolpedNota);
	}

	mostrarDialogos(tipo: number, detalle: SolpedDetalleModelo) {
		this.displayDialogoDet = true;
		this.tituloInsert = "Seleccionar Proveedor"; //(tipo == 1 ? "Insertar Nota" : "Insertar Proveedor");
		this.detalleSolpedNota = detalle;
	}

	cerrarDialogoSolped(){
		this.displayDialogoDet = false;
		this.tituloInsert = "";
		this.proveedorSelect = {};
		this.detalleSolpedNota = {};
	}

	/* 
		mostrarNotas(event, over: OverlayPanel, detalle: SolpedDetalleModelo) {
			this.detalleSolpedNota = detalle;
			over.toggle(event);
		} */

}
