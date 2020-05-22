import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models';
import { ProductosService, UserLocalStorageService } from 'src/app/services';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-lista-productos',
	templateUrl: './lista-productos.component.html',
	styleUrls: ['./lista-productos.component.scss'],
	providers: [ConfirmationService, MessageService, ProductosService, UserLocalStorageService]
})
export class ListaProductosComponent implements OnInit {

	productos: Producto[];
	productosTemp: Producto[];
	cols: any[];

	nuevoProducto: boolean = false;
	editarProducto: boolean = false;
	verProducto: boolean = false;

	codRolNuevoProducto = 'ROL-N-PRODUCTO';
	codRolEditarProducto = 'ROL-E-PRODUCTO';

	rolUsuario: boolean = false;

	checkedAprobados: boolean = false;
	checkedNoAprobados: boolean = false;
	checkedHabilitados: boolean = false;
	checkedValidados: boolean = false;
	checkedNoValidados: boolean = false;

	criterioBusqueda: string = "";

	constructor(
		private productoService: ProductosService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private router: Router,
		private rolesUsr: UserLocalStorageService,
	) { }

	ngOnInit() {

		this.nuevoProducto = this.rolesUsr.buscarRolPorCodigo(this.codRolNuevoProducto).length > 0 ? true : false;
		this.editarProducto = this.rolesUsr.buscarRolPorCodigo(this.codRolEditarProducto).length > 0 ? true : false;
		this.verProducto = true;

		this.productoService.consultarTodos().subscribe(productos => { this.productos = productos; this.productosTemp = productos }, error => this.showError(error));

		this.cols = [
			{ field: 'codigo', header: 'Codigo', width: '15%', display: "true" },
			{ field: 'nombre', header: 'Nombre', width: '30%', display: "true" },
			{ field: 'grupo', header: 'Grupo', width: '20%', display: "true" },
			{ field: 'activo', header: 'Estatus', width: '15%', display: "true" },
			{ field: 'uso', header: 'uso', width: '15%', display: "none" },
			{ field: 'subgrupo', header: 'SubGrupo', width: '20%', display: "none" },
			{ field: 'usuarioModificacion', header: 'usuarioModificacion', width: '0%', display: "none" },
		];
	}

	onChanceAprobados(event) {

		//let filter = this.checkedAprobados ? 1 : 0;
		this.productos = this.productosTemp;

		this.productos = (this.checkedAprobados ? this.productosTemp.filter(producto => producto.aprobado == 1) :
			this.productosTemp.filter(producto => { return producto.aprobado == 0 || producto.aprobado == 1 }));

	}
	onChanceNOAprobados(event) {

		//let filter = this.checkedNoAprobados ? 0 : false;
		this.productos = this.productosTemp;
		this.productos = (this.checkedNoAprobados ? this.productosTemp.filter(producto => producto.aprobado == 0) :
			this.productosTemp.filter(producto => { return producto.aprobado == 0 || producto.aprobado == 1 }));
	}

	onChanceValidados(event) {

		this.productos = this.productosTemp;
		this.productos = (this.checkedValidados ? this.productosTemp.filter(producto => producto.validado == 1) :
			this.productosTemp.filter(producto => { return producto.validado == 0 || producto.validado == 1 }));

	}

	onChanceNoValidados(event) {
		this.productos = (this.checkedNoValidados ? this.productosTemp.filter(producto => producto.validado == 0) :
			this.productosTemp.filter(producto => { return producto.validado == 0 || producto.validado == 1 }));

	}

	onChanceHabilitados(event) {

		//let filter = this.checkedHabilitados ? 0 : 1;
		this.productos = this.productosTemp;
		this.productos = (this.checkedHabilitados ? this.productosTemp.filter(producto => producto.activo == 0) :
		this.productosTemp.filter(producto => { return producto.activo == 0 || producto.activo == 1 }));

	}


	registro(e){
		console.log("regsitro:", e);
	}

	/* Nuevo producto */
	add() {
		this.rolUsuario = !this.verProducto;
		this.router.navigate(["detalleProducto", -1, this.rolUsuario]);
	}

	/* Ver informacion de un producto */
	ver(idAdmProducto: number) {
		this.rolUsuario = this.verProducto;
		this.router.navigate(["detalleProducto", idAdmProducto, this.rolUsuario]);
	}

	/* Modificar un producto */
	edit(idAdmProducto: number) {
		this.rolUsuario = !this.verProducto;
		console.log("editar", this.rolUsuario, "  ", idAdmProducto);
		
		this.router.navigate(["detalleProducto", idAdmProducto, this.rolUsuario]);
	}

	private showError(errMsg: string) {
		this.messageService.clear();
		this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
	}

	private showSuccess(successMsg: string) {
		this.messageService.clear();
		this.messageService.add({ key: 'tc', severity: 'success', summary: successMsg });
	}

}
