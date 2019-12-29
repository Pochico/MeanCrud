import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objeto } from '../models/objeto';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  selectedObjeto: Objeto;
  objetos: Objeto[];
  readonly URL_API = 'http://localhost:3000/api/objeto';

  constructor(private Http: HttpClient) {
    this.selectedObjeto = new Objeto();
    console.log(this.selectedObjeto);
  }

  getObjetos() {
    return this.Http.get(this.URL_API);
  }

  postObjeto(objeto: Objeto) {
    return this.Http.post(this.URL_API, objeto);
  }

  putObjeto(objeto: Objeto) {
    return this.Http.put(this.URL_API + `/${objeto._id}`, objeto);
  }

  deleteObjeto(_id: string) {
    return this.Http.delete(this.URL_API + `/${_id}`);
  }
}
