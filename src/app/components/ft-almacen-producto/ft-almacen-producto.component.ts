import { Component, OnInit, Input } from '@angular/core';
import *  as  data from '../../../app/data.json';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

import { FtAlmacenProductoService } from '../../services/ft-almacen-producto.service'
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/models/producto';
import { AlmacenesService } from '../../services/almacenes.service';
import { Puesto } from 'src/app/models/almacen.js';

import { ConfirmationService, MessageService } from 'primeng/api';
import { PuestoProducto } from 'src/app/models/PuestoProducto.js';

@Component({
	selector: 'app-ft-almacen-producto',
	templateUrl: './ft-almacen-producto.component.html',
	styleUrls: ['./ft-almacen-producto.component.scss'],
	providers: [FtAlmacenProductoService, ProductosService, AlmacenesService, MessageService, ConfirmationService]
})
export class FtAlmacenProductoComponent implements OnInit {

	@Input() producto: Producto;
	@Input() puedeEditar: boolean;

	files: TreeNode[];
	selectedFile: TreeNode;
	file: any = (data as any).default;
	pyfile: any;
	filesTree: TreeNode[] = [];
	selectedNode: TreeNode;
	canSelect: string;
	canEdit: any;
	puesto: TreeNode = {};
	idProducto: any;
	nodo: TreeNode = {};
	idPuestoProducto: any;
	dataParaComparar: TreeNode = {};
	PuestoTabla: Puesto[] = [];
	idPuestoTabla: any;
	dataparaflask: Puesto = {};
	estilo: string;
	forMaping: TreeNode[];
	puestoProducto: PuestoProducto = {};
	selectedFiles: TreeNode[];
	preselectednode: TreeNode = {}
	preselected: TreeNode[] = [];

	infoProducto: Producto = {};
	label: string;

	puestosOcupado: PuestoProducto[] = [];


	constructor(private AlmacenProductoService: FtAlmacenProductoService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private srvProducto: ProductosService,
		private servicioAlmacen: AlmacenesService) { }

	ngOnInit() {

		this.setArbol();

	}
	setArbol() {
		this.AlmacenProductoService.tree()
			.then((resp) => {
				this.pyfile = <TreeNode[]>resp;;
				//console.log(this.pyfile)
				this.filesTree = [{
					label: 'Almacenes',
					children: this.pyfile.data,
					expandedIcon: 'fas fa-warehouse',
					collapsedIcon: 'fas fa-warehouse',
					expanded: true,
				}]
				//this.forMaping = this.filesTree;
				this.maping(this.filesTree);
			});
	}

	maping(forMaping) {
		this.filesTree = forMaping;

		this.filesTree.map(root => {
			//root
			//console.log('padre', root);
			root.children.forEach(almacenes => {


				almacenes.children.forEach(piso => {

					piso.children.forEach(pasillo => {

						pasillo.children.forEach(estante => {

							estante.children.forEach(nivel => {

								nivel.children.forEach(puesto => {


									//console.log('id producto',puesto.data[1]);
									if (puesto.data[1] != null) {
										//puesto.selectable = false;
										puesto.icon = "fas fa-lock";
										puesto.type = "OCUPADO";
										//this.consultarNombredeProducto(puesto.data[1]) ;
										//console.log('data para infor productos', this.infoProducto)
										//this.label = this.infoProducto.nombre
										puesto.label = 'ocupado';

									} if (puesto.data[1] == this.producto.idAdmProducto) {

										this.selectedNode = puesto;
										this.selectedFile = this.selectedNode;


										this.preselectednode = puesto;

										this.preselected.push(this.preselectednode);
										//console.log(this.preselected);
										puesto.label = `${this.producto.nombre}`;
										puesto.partialSelected = true;
										puesto.selectable = true;
										puesto.icon = "fas fa-check-circle";
										puesto.styleClass = "ui-treenode-content-selected"
									}




								});
							});
						});

					});

				});
			});
		})
	}




	nodeSelect(evt: any): void {

		this.nodo = evt.node;
		//console.log(evt);
		this.canEdit = this.puedeEditar
		this.selectedNode = this.nodo;
		this.selectedFile = this.selectedNode;

		if (this.nodo.type == 'OCUPADO') {
			console.log('this.nodo', this.nodo)
			this.consultarNombredeProducto(this.nodo);
		}



		;
		if (this.puedeEditar == false) {
			this.nodo.selectable = false
			if (this.preselectednode.partialSelected == true && evt.node.partialSelected == true) {

				this.preselected.forEach(pre => {
					this.eliminarProductodeAlmacen(pre)
					//console.log('aqui se ejecuta eliminar producto de un puesto');
				})
				//this.eliminarProductodeAlmacen(evt.node)

			}
			else {
				if (evt.node.tabla == 'puesto' && evt.node.type == 'DISPONIBLE')


					this.agregarProductoEnALmacen(evt.node);


			}

		}




		/*  if(this.puedeEditar == false && this.preselectednode == evt.node){
		   console.log('aqui se ejecuta eliminar producto de un puesto');
		   this.eliminarProductodeAlmacen(evt.node)
		    
		 }
		 if (this.puedeEditar == false && evt.node.tabla =='puesto') {
	 
		  
			 this.agregarProductoEnALmacen(evt.node);
		   
	 
		 }  */
		//this.MuestraProductoEnAlmacen(evt.node);

	}



	/*  async buscarNodosPuestos() {
	   this.idProducto = this.producto.idAdmProducto;
   
	   await this.servicioAlmacen.getPuesto()
		 .then(resp => {
		   this.PuestoTabla = resp;
	  
   
		 });
	 } */



	agregarProductoEnALmacen(dataNodo) {
		this.idProducto = this.producto.idAdmProducto;
		this.nodo = dataNodo;
		this.dataparaflask = {};
		let idAdmPuesto = this.nodo.data[0];
		this.dataparaflask = { idAdmProducto: this.producto.idAdmProducto };
		//this.puestoProducto = {idAdmProducto: this.idProducto, idAdmPuesto: this.nodo.data }

		this.confirmationService.confirm({
			message: "¿Desea asignar este puesto al producto?",
			accept: () => {
				//console.log(idAdmPuesto, 'data para flask', this.dataparaflask);


				this.AlmacenProductoService.addProducto(idAdmPuesto, this.dataparaflask).then(
					result => {
						this.setArbol();
						this.preselectednode = {};
						this.selectedFile = this.nodo;
						this.dataparaflask = {};
						this.messageService.clear();
						this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO PUESTO ASIGANDO AL PRODUCTO' })
					}


					//this.AlmacenProductoService.nuevoPuestoProducto(this.puestoProducto).then();

					/* this.AlmacenProductoService.UpdatePuestodelProducto(this.idProducto, this.dataparaflask)
					.then(result => {
					  this.setArbol();
					  this.messageService.clear();
					  this.messageService.add({ key: 'tc', severity: 'success', summary: 'NUEVO PUESTO ASIGANDO AL PRODUCTO' })
			
					}); */


				)
				//}//, reject: () => {
				//this.selectedFile = {};
			}
		});



	}

	eliminarProductodeAlmacen(dataNodo) {
		let idAdmPuesto = dataNodo.data[0];
		this.dataparaflask = {};
		this.dataparaflask = { idAdmProducto: 0 };

		this.confirmationService.confirm({
			message: "¿Desea eliminar este producto del Almacen?",
			accept: () => {
				//console.log('setear a cero', idAdmPuesto, 'data para flask', this.dataparaflask);

				this.AlmacenProductoService.addProducto(idAdmPuesto, this.dataparaflask).then(
					result => {
						this.preselectednode = {};
						this.setArbol();
						this.messageService.clear();
						this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Relacion Puesto Producto eliminada' })
					});
			}
		});

	}

	consultarNombredeProducto(dataNodo) {

		this.AlmacenProductoService.consultarProductoporId(dataNodo.data[1])
			.then(response => {
			this.infoProducto = response;

				this.messageService.clear();
				this.messageService.add({ key: 'c', severity: 'info', summary: 'Detalles', detail: `${this.infoProducto[0].nombre}`, data: [`${dataNodo.data[2]}`, `${this.infoProducto[0].codigo}`], closable: true, sticky: true });
				console.log('data del producto por id', this.infoProducto[0]);

				return this.infoProducto
			});


	}
}
