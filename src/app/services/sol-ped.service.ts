import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SolpedModelo } from '../models/solped';
import { environment } from 'src/environments/environment';
import { LogTransacService } from '../services/logtransac.service';

import { TreeNode } from "../models/treenode";


@Injectable({
	providedIn: 'root'
})
export class SolPedService {

	private URL_api: string = environment.apiUrl + "solped";
	private URL_api_todos: string = environment.apiUrl + "solped";
	private URL_api_solticket: string = environment.apiUrl + "solpedticket";
	private URL_api_arbol: string = environment.nodeURL + "solpedydetalles";
	private URL_nodeTodos: string = environment.nodeURL + "solped";
	private URL_asiganarSolped: string = environment.nodeURL + "asignacionsolped";
	private URL_misSolpeds: string = environment.nodeURL + "missolped";
	private URL_presidencia: string = environment.nodeURL + "solspresidencia";
	private URL_cambiofase: string = environment.nodeURL + "cambiofasesolped"; //

	private Solped: SolpedModelo = {};
	private BehSolped: BehaviorSubject<SolpedModelo> = new BehaviorSubject<SolpedModelo>({});
	//private BehSolped: BehaviorSubject<SolpedModelo> ; 
	//BehSolped: Subject<SolpedModelo> = new Subject<SolpedModelo>();
	//BehSolped: EventEmitter<SolpedModelo> = new EventEmitter<SolpedModelo>();
	solped$ : Observable<SolpedModelo> = this.BehSolped.asObservable();

	constructor(private http: HttpClient, private srvlog: LogTransacService) {
		
	 }

	//Metodos para el observable
	/*getObservableSolped(): Observable<SolpedModelo> {
		//return this.solped$;
	} */

	async getDataObsverver(idSolpedCompras: number) {
		const solped : SolpedModelo = await this.http.get<SolpedModelo>(this.URL_nodeTodos + "/" + idSolpedCompras).toPromise(); //await this.http.get<SolpedModelo>(this.URL_api + "/" + idSolpedCompras).toPromise()[0];
		this.Solped = solped;
		//console.log("getdataobserver: ", solped);
		this.BehSolped.next(solped);
	}

	propagarData(solped :SolpedModelo){
		this.BehSolped.next(solped);
	}

	//Metodos de acceso
	getTodos(): Observable<SolpedModelo[]> {
		return this.http.get<SolpedModelo[]>(this.URL_api_todos)
			.pipe(
				tap(result => console.log(`Resultado SolPedes Exitoso`)),
				catchError(this.handleError('getTodosSolPed ', []))
			);
	}
	getTodosP(): Promise<SolpedModelo[]> {
		return this.http.get<SolpedModelo[]>(this.URL_nodeTodos).toPromise();
	}

	getMisSolPeds(idSegUsuario: number): Promise<SolpedModelo[]> {
		return this.http.get<SolpedModelo[]>(this.URL_misSolpeds + "/" + idSegUsuario).toPromise();
	}

	getMisSolPedsPresindencia(): Promise<SolpedModelo[]> {
		return this.http.get<SolpedModelo[]>(this.URL_presidencia).toPromise();
	}

	getArbolMasterDetail() {
		return this.http.get<TreeNode[]>(this.URL_api_arbol).toPromise();
	}


	getDetalleSolPed(idSolpedCompras: number): Promise<SolpedModelo> {
		return this.http.get<SolpedModelo>(this.URL_api + "/" + idSolpedCompras).toPromise();
	}

	getDetalleSolPedOne(idSolpedCompras: number): Promise<SolpedModelo> {
		return this.http.get<SolpedModelo>(this.URL_nodeTodos + "/" + idSolpedCompras).toPromise();
	}

	getDetalleSolPedTicket(idticket: number): Promise<SolpedModelo> {
		return this.http.get<SolpedModelo>(this.URL_api_solticket + "/" + idticket).toPromise();
	}



	nuevoSolPed(SolPed: SolpedModelo) {
		/*return this.http.post(this.URL_api, SolPed).pipe(
		  tap(result => {
			const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			this.srvlog.logearTransaccion("SolPed ingresado", currentUser);
		  }),
		  catchError(this.handleError('setSolPed', []))
		);*/
		return this.http.post(this.URL_api, SolPed).toPromise()
			.then(data => { return data });
	}

	cambiarFase(solped: SolpedModelo) {
		return this.http.put(this.URL_cambiofase, solped).toPromise();
	}

	actualizarSolPed(SolPed: SolpedModelo) {
		/*   return this.http.put<SolpedModelo>(this.URL_api + "/" + SolPed.idSolpedCompras, SolPed).pipe(
			tap(result => {
			  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			  this.srvlog.logearTransaccion("SolPed actualizado", currentUser);
			}),
			catchError(this.handleError('setSolPed', []))
		  ); */
		// console.log("Consultado:", SolPed);
		return this.http.put(this.URL_nodeTodos + "/" + SolPed.idSolpedCompras, SolPed).toPromise();
	}

	asignarSolped(SolPed: SolpedModelo) {
		return this.http.put(this.URL_asiganarSolped + "/" + SolPed.idSolpedCompras, SolPed).toPromise();
	}

	eliminarSolPed(SolPed: SolpedModelo) {

		return this.http.delete(this.URL_api + "/" + SolPed.idSolpedCompras).pipe(
			tap(result => {
				console.log('SolPed Eliminado');
				const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
				this.srvlog.logearTransaccion("SolPed Eliminado", currentUser);
			}),
			catchError(this.handleError('setSolPed', []))
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
