import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { ProveedorModelo } from "../models/proveedor-modelo";

@Injectable({
	providedIn: 'root'
})
export class ProveedoresComprasService {

	api_URL: string = environment.nodeURL + "proveedores";

	constructor(private http: HttpClient) { }

	getAll(): Promise<ProveedorModelo[]> {
		return this.http.get<ProveedorModelo[]>(this.api_URL).toPromise();
	}


}
