import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule }  from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PuestoProducto } from '../models/PuestoProducto';
import { Puesto } from '../models/almacen';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class FtAlmacenProductoService {

  url: string;
  url2: string;
  data: any[];
  url3: string;
  URI:  string;
  puesto: Puesto;


  puestoProducto: PuestoProducto = {};


  constructor(private http: HttpClient, private htttpModule: HttpClientModule) {

    this.url = environment.pyApiUrl + 'tree';
    this.url2 = environment.pyApiUrl + 'ftAlmacen';
   // this.url3 = environment.pyApiUrl + 'puesto-producto';
    this.URI = environment.pyApiUrl + 'puestoproducto';
    this.url3 = environment.apiUrl + 'productos';

   }
/////// arma diagrama de almacenes
   tree() {
     return this.http.get<any>(this.url).toPromise()
   }

   getPuestoProductobyId(id: number): Promise<any> {
     let url2 = `${this.url2}/${id}`;
     return this.http.get(url2).toPromise();

   }

   UpdatePuestodelProducto(idProducto, idPuestoAlmacen) {
     let url2 = `${this.url2}/${idProducto}`;
     return this.http.put(url2, idPuestoAlmacen).toPromise();
   }
   

   addProducto(idPuestoAlmacen, idProducto) {
     let URI = `${this.URI}/${idPuestoAlmacen}`;
     return this.http.put(URI, idProducto).toPromise()

   }

   consultarProductoporId(idAdmProducto: number): Promise<any>{
    let apiURL = `${this.url3}/${idAdmProducto}`;
		return this.http.get<Producto>(apiURL).toPromise();
   }



/* 
   ///manejar datos tabla hija
   nuevoPuestoProducto(nuevo: PuestoProducto) {
     return this.http.post(this.url3, nuevo).toPromise();
   }

   ModificarPuestoProducto(puestoProducto: PuestoProducto) {
     let url3 = `${this.url3}/${puestoProducto.idAdmProducto}`;
     return this.http.put(url3, puestoProducto.idAdmPuesto).toPromise();
   }

   getPuestosOcupados(): Promise<PuestoProducto[]>  { 
     return this.http.get<PuestoProducto[]>(this.url3).toPromise();
   }

   getPuestosIdProducto(puestoProducto: PuestoProducto) {
     let url3 = `${this.url3}/${puestoProducto.idAdmProducto}`;
     return this.http.get<PuestoProducto>(url3).toPromise();
   } */
  }
