//se establecen todos los servicios relacionados a:
//almacenes, piso, pasillo, estantes y puestos.

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Almacen } from '../models/almacen';
import { Piso } from '../models/almacen';
import { Pasillo } from '../models/almacen';
import { Estante } from '../models/almacen';
import { Nivel } from '../models/almacen';
import { Puesto } from '../models/almacen';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {

  url: string;
  url2: string;
  UrlPiso: string;
  UrlPasillo: string;
  UrlEstante: string;
  UrlNivel: string;
  UrlPuesto: string;
  UrlNode: string;
  
  data: any[];

  constructor(private http: HttpClient, private httpModule: HttpClientModule) {

    this.url = environment.pyApiUrl + 'almacenes';
    //this.url2 = environment.pyApiUrl + 'almacenes2';
    this.UrlPiso = environment.pyApiUrl + 'almacenes_piso';
    this.UrlPasillo = environment.pyApiUrl + 'almacenes_pasillo';
    this.UrlEstante = environment.pyApiUrl + 'almacenes_estante';
    this.UrlNivel = environment.pyApiUrl + 'estante_nivel';
    this.UrlPuesto = environment.pyApiUrl + 'puesto';
    this.UrlNode = environment.pyApiUrl + 'estructura';
 
}
/////////////////Almacen  
todosAlmacenes(): Promise<Almacen[]> {
    return this.http.get<Almacen[]>(this.url).toPromise();
    }
  
  nuevoAlmacen(nuevo: Almacen){
    return this.http.post<Almacen>(this.url, nuevo).toPromise();
  }

  modificarAlmacen(updatedalmacen: Almacen){
    let url =`${this.url}/${updatedalmacen.idAdmAlmacen}`;
    return this.http.put<Almacen>(url, updatedalmacen).toPromise();
  }

  eliminarAlmacen(id: number): Promise<any> {
    let url =`${this.url}/${id}`;
    return this.http.delete<Almacen>(url).toPromise().catch(this.handleError);
  }
  
    private handleError(error: any): Promise<any> {
      console.log('An error occurred in MyService', error);
      return Promise.reject(error.message || error);
  }
///////////////////////PISO////////////////////////////////

getPiso(): Promise<Piso[]> {
  return this.http.get<Piso[]>(this.UrlPiso).toPromise();
  }

addPiso(nuevo: Piso){
  return this.http.post<Piso>(this.UrlPiso, nuevo).toPromise();
  }

modificarPiso(piso: Piso){
  let UrlPiso =`${this.UrlPiso}/${piso.idAdmPisoAlmacen}`;
  return this.http.put<Piso>(UrlPiso, piso).toPromise();
  }

eliminarPiso(id: number): Promise<any> {
  let UrlPiso = `${this.UrlPiso}/${id}`;
  return this.http.delete<Piso>(UrlPiso).toPromise();
  }

  //////////////////////////PASILLO/////////////////////////////////////
  
  getPasillo(): Promise<Pasillo[]> {
    return this.http.get<Pasillo[]>(this.UrlPasillo).toPromise();
    }
  
  nuevoPasillo(nuevo: Pasillo){
    return this.http.post<Pasillo>(this.UrlPasillo, nuevo).toPromise();
  }

  modificarPasillo(pasillo: Pasillo){
    let UrlPasillo =`${this.UrlPasillo}/${pasillo.idPasillo}`;
    return this.http.put<Pasillo>(UrlPasillo, pasillo).toPromise();
  }

  eliminarPasillo(id: number): Promise<any> {
    let UrlPasillo =`${this.UrlPasillo}/${id}`;
    return this.http.delete<Pasillo>(UrlPasillo).toPromise();
  }
 ////////////////////////////ESTANTE////////////////////////////////
  getEstante(): Promise<Estante[]> {
    return this.http.get<Estante[]>(this.UrlEstante).toPromise();
    }
  
  nuevoEstante(nuevo: Estante){
    return this.http.post<Estante>(this.UrlEstante, nuevo).toPromise();
  }

  modificarEstante(estante: Estante){
    let UrlEstante =`${this.UrlEstante}/${estante.idAdmEstante}`;
    return this.http.put<Estante>(UrlEstante, estante).toPromise();
  }

  eliminarEstante(id: number): Promise<any> {
    let UrlEstante =`${this.UrlEstante}/${id}`;
    return this.http.delete<Estante>(UrlEstante).toPromise();
  }
//////////////////NIVEL ESTANTE///////////////////////////////

getNivel(): Promise<Nivel[]> {
  return this.http.get<Nivel[]>(this.UrlNivel).toPromise();
}

nuevoNivel(nuevo: Nivel){
  return this.http.post<Nivel>(this.UrlNivel, nuevo).toPromise();
}

updateNivel(nivel: Nivel){
  let UrlNivel =`${this.UrlNivel}/${nivel.idAdmNivel}`;
    return this.http.put<Nivel>(UrlNivel, nivel).toPromise();
}

eliminarNivel(id: number): Promise<any> {
  let UrlNivel =`${this.UrlNivel}/${id}`;
  return this.http.delete<Nivel>(UrlNivel).toPromise();
}

////////////////////PUESTO//////////////////////////////////7

getPuesto(): Promise<Puesto[]> {
  return this.http.get<Puesto[]>(this.UrlPuesto).toPromise();
}

nuevoPuesto(nuevo: Puesto){
  return this.http.post<Puesto>(this.UrlPuesto, nuevo).toPromise();

}

updatePuesto(puesto: Puesto){
  let UrlPuesto =`${this.UrlPuesto}/${puesto.idAdmPuesto}`;
    return this.http.put<Puesto>(UrlPuesto, puesto).toPromise();
}

eliminarPuesto(id: number): Promise<any> {
  let UrlPuesto =`${this.UrlPuesto}/${id}`;
  return this.http.delete<Puesto>(UrlPuesto).toPromise();
}

////////////////PARA LLENAR TABLA PRIME NG///////

nodeTree(){
 return this.http.get<any>(this.UrlNode).toPromise()
    
    
}


}
