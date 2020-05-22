
import { Component, OnInit, Input } from '@angular/core';

import { SolpedDetalleModelo } from 'src/app/models/solped-detalle';
import { SolPedDetalleService } from 'src/app/services/sol-ped-detalle.service';

@Component({
	selector: 'app-solpedsdetalle',
	templateUrl: './solpedsdetalle.component.html',
	styleUrls: ['./solpedsdetalle.component.scss'],
	providers: [SolPedDetalleService]
})
export class SolpedsdetalleComponent implements OnInit {

	@Input() idSolped: number = 0;
	@Input() dataExtra: boolean = false;

	constructor(private svrDetalleSolped: SolPedDetalleService) { }

	detalleSolped: SolpedDetalleModelo[] = [];
	cols: any[];

	ngOnInit() {

		this.cols = [
			{ field: 'codigo', header: 'Codigo', witdh: "10%" },
			{ field: 'nombre', header: 'Nombre', witdh: "40%" },
			{ field: 'uso', header: 'Uso', witdh: "5%" },
			{ field: 'fechaRequerida', header: 'Fecha requerida', witdh: "10%" },
			{ field: 'cantidad', header: 'Cant', witdh: "5%" },
			{ field: 'nombre_activo', header: 'Proposito', witdh: "30%" }
		];

		if (this.dataExtra) {
			this.cols.push(
				{ field: 'cant_encontrada', header: 'Encon', witdh: "5%" },
				{ field: 'nombre_proveedor', header: 'Provee', witdh: "17%" },
				{ field: 'precio', header: 'Precio (BsS)', witdh: "10%" }
			);
		}


		//console.log(this.idSolped);
		this.svrDetalleSolped.getDetalleDetSolpedP(this.idSolped)
			.then((data) => {
				this.detalleSolped = data;
			});
	}

	nada() {
		return false;
	}

}
