import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SolPedService } from 'src/app/services/sol-ped.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SolpedModelo } from 'src/app/models/solped';

@Component({
	selector: 'app-solped-one',
	templateUrl: './solped-one.component.html',
	styleUrls: ['./solped-one.component.scss'],
	providers: [MessageService, ConfirmationService]
})
export class SolpedOneComponent implements OnInit, OnChanges {

	solpedOne: SolpedModelo = {};
	@Input() idSolpedCompras: number = -1;

	constructor(private svrSolped: SolPedService) { }

	async ngOnChanges() {
		//await this.svrSolped.getDataObsverver(this.idSolpedCompras);
		/* this.svrSolped.solped$.subscribe((data) => {
			this.solpedOne = data;
		}); */
	}

	async ngOnInit() {
		/* this.svrSolped.getDetalleSolPedOne(this.idSolpedCompras)
			.then(async (result) => {
				this.solpedOne = result;
				this.svrSolped.propagarData(result);
				this.svrSolped.solped$.subscribe((data) => {
					console.log("One subscripcion: ", data);
					this.solpedOne = data;
				});
			}); */

		//await this.svrSolped.getDataObsverver(this.idSolpedCompras);

		if (this.idSolpedCompras != -1) {
			this.solpedOne = await this.svrSolped.getDetalleSolPedOne(this.idSolpedCompras);
			//console.log("solped await: ", this.solpedOne)
		} else {
			console.log("Entro obs")
			this.svrSolped.solped$.subscribe((data: SolpedModelo) => {
				///console.log("One subscripcion: ", data.idSolpedCompras);
				if (!this.isEmpty(data)) {
					this.solpedOne = data;
				}
			});
		}


		//
	}

	isEmpty(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop))
				return false;
		}
		return JSON.stringify(obj) === JSON.stringify({});
	}

}
