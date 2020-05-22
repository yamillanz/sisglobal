import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SolpedDetalleModelo } from '../models/solped-detalle';
import { environment } from 'src/environments/environment';
import { LogTransacService } from '../services/logtransac.service';

@Injectable({
	providedIn: 'root'
})
export class SolPedDetalleService {
	private URL_api: string = environment.apiUrl + "solpeddetalle";
	private URL_api_todos: string = environment.apiUrl + "solpeddetalle";
	private URL_por_TS = environment.apiUrl + "solpeddetallets";
	private URL_nodeDeta = environment.nodeURL + "detallesolped";

	constructor(private http: HttpClient, private srvlog: LogTransacService) { }

	getTodos(): Observable<SolpedDetalleModelo[]> {
		return this.http.get<SolpedDetalleModelo[]>(this.URL_api_todos)
			.pipe(
				tap(result => console.log(`Resultado DetSolpedes Exitoso`)),
				catchError(this.handleError('getTodosDetSolped ', []))
			);
	}

	getDetalleDetSolped(idDetalleSolped: number) {
		return this.http.get<SolpedDetalleModelo>(this.URL_api + "/" + idDetalleSolped)
			.pipe(
				tap(result => console.log(`Resultado DetalleDetSolped Exitoso`)),
				catchError(this.handleError('getDetallePefil ', []))
			);
	}

	getDetalleDetSolpedP(idSolped: number): Promise<SolpedDetalleModelo[]> {
		return this.http.get<SolpedDetalleModelo[]>(this.URL_nodeDeta + "/" + idSolped).toPromise();
	}

	getDetalleSolPedPorTS(idTicket: number) {
		return this.http.get<SolpedDetalleModelo[]>(this.URL_por_TS + "/" + idTicket).toPromise()
			.then(data => { return data });
	}

	nuevoDetSolped(DetSolped: SolpedDetalleModelo) {
		/* return this.http.post(this.URL_api, DetSolped).pipe(
		   tap(result => {x
			 const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			 this.srvlog.logearTransaccion("DetSolped ingresado", currentUser);
		   }),
		   catchError(this.handleError('setDetSolped', []))
		 );*/
		return this.http.post(this.URL_api, DetSolped).toPromise()
			.then(data => { return data; })
			.catch(this.handleError('setDetSolped', []));
	}


	actualizarDetSolped(DetSolped: SolpedDetalleModelo) {
		return this.http.put<SolpedDetalleModelo>(this.URL_api + "/" + DetSolped.idDetalleSolped, DetSolped).pipe(
			tap(result => {
				const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
				this.srvlog.logearTransaccion("DetSolped actualizado", currentUser);
			}),
			catchError(this.handleError('setDetSolped', []))
		);
	}

	updateDetSolped(DetSolped: SolpedDetalleModelo) {
		return this.http.put(this.URL_nodeDeta, DetSolped).toPromise();
	}

	eliminarDetSolped(DetSolped: SolpedDetalleModelo) {

		return this.http.delete(this.URL_api + "/" + DetSolped.idDetalleSolped).pipe(
			tap(result => {
				//console.log('DetSolped Eliminado');
				const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
				this.srvlog.logearTransaccion("DetSolped Eliminado", currentUser);
			}),
			catchError(this.handleError('setDetSolped', []))
		);
	}

	//---------------Manejo de Errores
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		};
	}

}
