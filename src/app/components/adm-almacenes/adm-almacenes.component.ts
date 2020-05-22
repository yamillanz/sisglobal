import { Component, OnInit, asNativeElements } from '@angular/core';
import { AlmacenesService } from '../../services/almacenes.service';

import { TreeTableModule } from 'primeng/treetable';
import { TreeNode, rowNode } from '../../models/treenode';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';



import { Almacen, Nivel } from '../../models/almacen';
import { Piso } from '../../models/almacen';
import { Pasillo } from '../../models/almacen';
import { Estante } from '../../models/almacen';
import { Puesto } from '../../models/almacen';
import { SelectedNode } from '../../models/almacen';




@Component({
	selector: 'app-adm-almacenes',
	templateUrl: './adm-almacenes.component.html',
	styleUrls: ['./adm-almacenes.component.scss'],
	providers: [AlmacenesService, MessageService, ConfirmationService],

	styles: [`
        .kb-row {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        .kb-cell {
            background-color: #2CA8B1 !important;
            color: #ffffff !important;
        }
    `]

})
export class AdmAlmacenesComponent implements OnInit {

	files: TreeNode[];
	almacenes: Almacen[] = [];
	Tpasillos: Pasillo[] = [];
	almacen: Almacen = {};
	UNpiso: Piso = {};
	Tpasillo: Pasillo = {};
	cols: any[];
	Tpisos: Piso[] = [];
	Testantes: Estante[] = [];
	Tpuestos: Puesto[] = [];
	UNpasillo: Pasillo = {};
	UNestante: Estante = {};
	UNpuesto: Puesto = {};
	UNnivel: Nivel = {};

	selectedItem: SelectedNode = {};
	itemForDialog: SelectedNode;

	displayDialog: boolean
	menuItems: SelectItem[] = [];
	parentItems: SelectItem[] = []
	tituloDialogo: string;
	editOnEvent: boolean;
	readonly: boolean;


	arbol: TreeNode[] = [];
	node: rowNode = {};
	selectedNode: rowNode;
	


	constructor(private almacenesservice: AlmacenesService, private messageService: MessageService, private confirmationservice: ConfirmationService) { }

	ngOnInit() {

		this.cols = [

			{ field: 'nombre', header: 'Nombre', width: '30%', display: "true" },
			{ field: 'codigo', header: 'Codigo', width: '30%', display: "true" },
			{ field: 'descripcion', header: 'Descripcion', width: '35%', display: "true" },
			{ field: 'idPadre', header: ' ID', width: '10%', display: "none" },
			{ field: 'idPropio', header: 'ID Parent', width: '5%', display: "none" },
		];

		this.treenode();

		this.parentItems = [
			{ label: 'Almacen', value: '1' },
			{ label: 'Piso', value: '2' },
			{ label: 'Pasillo', value: '3' },
			{ label: 'Estante', value: '4' },
			{ label: 'Nivel', value: '5' },
			{ label: 'Puesto', value: '6' }

		];

	}
	treenode() {
		//this.arbol = [];
		this.almacenesservice.nodeTree().
			then((resp) => {

				this.arbol = <TreeNode[]>resp;
			});
	}

	cerrarDialogo() {
		this.displayDialog = false;
	}



	edit(rowNode: any) {
		this.readonly = true
		this.menuItems =[];
		this.setItemselect(rowNode);
		this.tituloDialogo = (this.selectedItem.tabla);
		this.displayDialog = true;

	}


	setItemselect(rowNode: any) {
		//console.log("rownode", rowNode);
		this.selectedItem = {
			idPropio: rowNode.idPropio, codigo: rowNode.codigo, nombre: rowNode.nombre,
			descripcion: rowNode.descripcion, tabla: rowNode.tabla, idPadre: rowNode.idPadre
		};
		
	}

	setParent(value) {
		if (value == 2) {
			this.almacenesservice.todosAlmacenes()
				.then(data => {
					this.menuItems = [];
					data.forEach(almacen => {
						this.menuItems.push({ label: `${almacen.idAdmAlmacen} - ${almacen.codAlmacen}-${almacen.descripcion}` , value: almacen.idAdmAlmacen });
						return this.menuItems;
					});
				});
		} if (value == 3) {
			this.almacenesservice.getPiso()
				.then(data => {
					this.menuItems = [];
					data.forEach(piso => {
						this.menuItems.push({ label: `${piso.idAdmPisoAlmacen} - ${piso.codigo} - ${piso.descripcion}`, value: piso.idAdmPisoAlmacen });
						return this.menuItems;
					});
				});

		} if (value == 4) {
			this.almacenesservice.getPasillo()
				.then(data => {
					this.menuItems = [];
					data.forEach(pasillo => {
						this.menuItems.push({ label:`${pasillo.idPasillo} - ${pasillo.codPasillo}- ${pasillo.descripcion}`, value: pasillo.idPasillo });
						return this.menuItems;
					});
				});
		} if (value == 5) {
			this.almacenesservice.getEstante()
				.then(data => {
					this.menuItems = [];
					data.forEach(estante => {
						this.menuItems.push({ label:`${estante.idAdmEstante}-${estante.codigo}- ${estante.descripcion}`, value: estante.idAdmEstante });
						return this.menuItems;
					});
				});
		} if (value == 6) {
			this.almacenesservice.getNivel()
				.then(data => {
					this.menuItems = [];
					data.forEach(nivel => {
						this.menuItems.push({ label:`${nivel.idAdmNivel} -${nivel.codigo}- ${nivel.descripcion}`, value: nivel.idAdmNivel });
						return this.menuItems;
					});
				});

		}


	}

	onChangeparentItems(event) {
		let changedValue = event.value;
		let domEvent = event.originalEvent;
		//console.log('onchage active', changedValue);
		this.setParent(changedValue);
		this.menuItems;

	}

	Nuevo() {
		this.readonly = false;
		this.menuItems = [];
		this.selectedItem = {};
		this.tituloDialogo = 'Nuevo';
		this.displayDialog = true;

	}

	SaveChanges(selectedItem) {
		if (this.selectedItem.idPropio == null) {
			this.nuevoItem(selectedItem);
			//console.log(selectedItem);
		} else {
			this.modificar(selectedItem);
		}

	}

	nuevoItem(selectedItem) {

		if (this.selectedItem.tabla == '1') {
			this.almacen = {
				codAlmacen: selectedItem.codigo,
				nombreAlmacen: selectedItem.nombre,
				idAdmAlmacen: selectedItem.idPropio,
				descripcion: selectedItem.descripcion
			};
			
			this.almacenesservice.nuevoAlmacen(this.almacen)
				.then(data => {
					this.almacen = data
					this.treenode();
					this.displayDialog = false
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO ALMACEN CREADO' });
				});

		} if (this.selectedItem.tabla == '2') {

			this.UNpiso = {
				idAdmPisoAlmacen: selectedItem.idPropio,
				descripcion: selectedItem.descripcion,
				idAlmacen: selectedItem.idPadre,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.addPiso(this.UNpiso)
				.then(data => {
					this.UNpiso = data;
					this.treenode()
					this.displayDialog = false
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO PISO INGRESADO' });
				});

		} if (this.selectedItem.tabla == '3') {

			this.UNpasillo = {
				idPasillo: selectedItem.idPropio,
				codPasillo: selectedItem.codigo,
				idPiso: selectedItem.idPadre,
				descripcion: selectedItem.descripcion,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.nuevoPasillo(this.UNpasillo)
				.then(data => {
					this.UNpasillo = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO PASILLO INGRESADO' });
				});
		} if (this.selectedItem.tabla == '4') {

			this.UNestante = {
				idAdmEstante: selectedItem.idPropio,
				descripcion: selectedItem.descripcion,
				idPasillo: selectedItem.idPadre,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.nuevoEstante(this.UNestante)
				.then(data => {
					this.UNestante = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO ESTANTE INGRESADO' });
				});
		} if (this.selectedItem.tabla == '5') {
			this.UNnivel = {
				idAdmNivel: selectedItem.idPropio,
				descripcion: selectedItem.descripcion,
				idAdmEstante: selectedItem.idPadre,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.nuevoNivel(this.UNnivel)
				.then(data => {
					this.UNnivel = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO NIVEL INGRESADO' });
				});
		} if (this.selectedItem.tabla == '6') {
			this.UNpuesto = {
				idAdmPuesto: selectedItem.idPropio,
				idAdmNivelEstante: selectedItem.idPadre,
				descripcion: selectedItem.descripcion,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.nuevoPuesto(this.UNpuesto)
				.then(data => {
					this.UNpuesto = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO PUESTO INGRESADO' });
				});
		}
	}
	modificar(selectedItem) {
		//console.log('got so far', selectedItem);
		if (this.selectedItem.tabla == 'Almacen') {
			this.almacen = {
				codAlmacen: selectedItem.codigo,
				nombreAlmacen: selectedItem.nombre,
				idAdmAlmacen: selectedItem.idPropio,
				descripcion: selectedItem.descripcion
			};
			//console.log('got so far', this.almacen);
			this.almacenesservice.modificarAlmacen(this.almacen)
				.then(data => {
					this.almacen = data
					//console.log('got so far', this.almacen);
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'ALMACEN MODIFICADO' });

				});
		} if (this.selectedItem.tabla == 'Piso') {

			this.UNpiso = {
				idAdmPisoAlmacen: selectedItem.idPropio,
				descripcion: selectedItem.descripcion,
				idAlmacen: selectedItem.idPadre,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.modificarPiso(this.UNpiso)
				.then(data => {
					this.UNpiso = data;
					this.treenode()
					this.displayDialog = false
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'PISO MODIFICADO' });
				});

		} if (this.selectedItem.tabla == 'Pasillo') {

			this.UNpasillo = {
				idPasillo: selectedItem.idPropio,
				codPasillo: selectedItem.codigo,
				idPiso: selectedItem.idPadre,
				descripcion: selectedItem.descripcion,
				nombre: selectedItem.nombre
			};


			this.almacenesservice.modificarPasillo(this.UNpasillo)
				.then(data => {
					this.UNpasillo = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'PASILLO MODIFICADO' });
				});
		} if (this.selectedItem.tabla == 'Estante') {

			this.UNestante = {
				idAdmEstante: selectedItem.idPropio,
				descripcion: selectedItem.descripcion,
				idPasillo: selectedItem.idPadre,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.modificarEstante(this.UNestante)
				.then(data => {
					this.UNestante = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'ESTANTE MODIFICADO' });
				});
		} if (this.selectedItem.tabla == 'Nivel') {
			this.UNnivel = {
				idAdmNivel: selectedItem.idPropio,
				descripcion: selectedItem.descripcion,
				idAdmEstante: selectedItem.idPadre,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.updateNivel(this.UNnivel)
				.then(data => {
					this.UNnivel = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'NIVEL MODIFICADO' });
				});
		} if (this.selectedItem.tabla == 'Puesto') {
			this.UNpuesto = {
				idAdmPuesto: selectedItem.idPropio,
				idAdmNivelEstante: selectedItem.idPadre,
				descripcion: selectedItem.descripcion,
				codigo: selectedItem.codigo,
				nombre: selectedItem.nombre
			};

			this.almacenesservice.updatePuesto(this.UNpuesto)
				.then(data => {
					this.UNpuesto = data;
					this.treenode();
					this.displayDialog = false;
					this.messageService.clear();
					this.messageService.add({ key: 'tc', severity: 'success', summary: 'PUESTO MODIFICADO' });
				});
		}


	}
	remove(selectedItem, node) {
				
		this.selectedNode = node;
	
		
		if (this.selectedNode.node.children == undefined || this.selectedNode.node.children.length == 0){

			 if (selectedItem.tabla == "Almacen") {
				this.removeAlmacenes(selectedItem);
			}
			if (selectedItem.tabla == "Puesto") {
				this.removePuesto(selectedItem);
			}
			if (selectedItem.tabla == "Nivel"){
				this.removeNivel(selectedItem);
			}
			if (selectedItem.tabla == "Estante") {
				this.removeEstante(selectedItem);
			}
			if(selectedItem.tabla == "Pasillo") {
				this.removePasillo(selectedItem);
			}
			if(selectedItem.tabla == "Piso") {
				this.removePiso(selectedItem);
			}

		} 
		else { 

			this.messageService.clear();
			this.messageService.add({ key: 'tc', severity: 'warn', summary: 'No se puede eliminar; posee data relacionada' });
			this.selectedNode = {};
			
		}
		
		 this.treenode();
		
	}

	removeAlmacenes(selectedItem) {
		this.confirmationservice.confirm({
			message: "El registro seleccionado se eliminará",
			accept: () => {

				this.almacen = {
					codAlmacen: selectedItem.codigo,
					nombreAlmacen: selectedItem.nombre,
					idAdmAlmacen: selectedItem.idPropio,
					descripcion: selectedItem.descripcion
				};
				
				this.almacenesservice.eliminarAlmacen(this.almacen.idAdmAlmacen)
				.then(d =>{ this.treenode();
						this.almacen = {};
						this.selectedItem = {}; });
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'ALMACEN ELIMINADO' });
				
				
			} 
		}); this.treenode();

	}
	removePuesto(selectedItem) {
		this.confirmationservice.confirm({
			message: "El registro seleccionado se eliminará",
			accept: () => {
				this.UNpuesto = {
					idAdmPuesto: selectedItem.idPropio,
					idAdmNivelEstante: selectedItem.idPadre,
					descripcion: selectedItem.descripcion,
					codigo: selectedItem.codigo,
					nombre: selectedItem.nombre
				};
				this.almacenesservice.eliminarPuesto(this.UNpuesto.idAdmPuesto)
				.then(d =>{ this.treenode();
						this.UNpuesto = {};
						this.selectedItem = {}; });
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'ELEMENTO ELIMINADO' });
				
			}
		});

	}

	removeNivel(selectedItem){
		this.confirmationservice.confirm({
			message: "El registro seleccionado se eliminará",
			accept: () => {
				this.UNnivel = {
					idAdmNivel: selectedItem.idPropio,
					descripcion: selectedItem.descripcion,
					idAdmEstante: selectedItem.idPadre,
					codigo: selectedItem.codigo,
					nombre: selectedItem.nombre
				};
	
				this.almacenesservice.eliminarNivel(this.UNnivel.idAdmNivel)
				.then(d =>{ this.treenode();
						this.UNnivel = {};
						this.selectedItem = {}; });
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'ELEMENTO ELIMINADO' });
			}
		}); 

	}
	removeEstante(selectedItem){
		this.confirmationservice.confirm({
			message: "El registro seleccionado se eliminará",
			accept: () => {

				this.UNestante = {
					idAdmEstante: selectedItem.idPropio,
					descripcion: selectedItem.descripcion,
					idPasillo: selectedItem.idPadre,
					codigo: selectedItem.codigo,
					nombre: selectedItem.nombre
				};
				this.almacenesservice.eliminarEstante(this.UNestante.idAdmEstante)
				.then(d =>{ this.treenode();
						this.UNestante = {};
						this.selectedItem = {}; });
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'ESTANTE ELIMINADO' });

			}
		});
	}

	removePasillo(selectedItem){
		this.confirmationservice.confirm({
			message: "El registro seleccionado se eliminará",
			accept: () => {

				this.UNpasillo = {
					idPasillo: selectedItem.idPropio,
					codPasillo: selectedItem.codigo,
					idPiso: selectedItem.idPadre,
					descripcion: selectedItem.descripcion,
					nombre: selectedItem.nombre
				};
				this.almacenesservice.eliminarPasillo(this.UNpasillo.idPasillo)
				.then(d =>{ this.treenode();
						this.UNpasillo = {};
						this.selectedItem = {};
					 });
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'PASILLO ELIMINADO' });
				
			}
		});

	}

	removePiso(selectedItem){

		this.confirmationservice.confirm({
			message: "El registro seleccionado se eliminará",
			accept: () => {
				this.UNpiso = {
					idAdmPisoAlmacen: selectedItem.idPropio,
					descripcion: selectedItem.descripcion,
					idAlmacen: selectedItem.idPadre,
					codigo: selectedItem.codigo,
					nombre: selectedItem.nombre
				};
				this.almacenesservice.eliminarPiso(this.UNpiso.idAdmPisoAlmacen)
				.then(d =>{ this.treenode();
						this.UNpiso = {};
						this.selectedItem = {}; });
				this.messageService.clear();
				this.messageService.add({ key: 'tc', severity: 'success', summary: 'PISO ELIMINADO' });
			}
		});
	}



}