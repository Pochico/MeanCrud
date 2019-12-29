import { Component, OnInit } from '@angular/core';
import { ObjetoService } from 'src/app/services/objeto.service';
import { NgForm } from '@angular/forms';
import { Objeto } from 'src/app/models/objeto';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.scss']
})
export class ObjetosComponent implements OnInit {

  constructor(public objetoService: ObjetoService) { } //  El componente objetos.html coge la variable para el ngmodel, no el servicio.

  ngOnInit() {
    this.getObjetos();
  }

  addObjeto(form: NgForm) {
    if (form.value._id) {
      this.objetoService.putObjeto(form.value)
        .subscribe(res => {
          console.log(res);
        this.getObjetos();
        this.resetForm(form);
        })
    }else {
      this.objetoService.postObjeto(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        this.getObjetos();
      })
    }
  }

  getObjetos() {
    this.objetoService.getObjetos()
      .subscribe(res => {
        this.objetoService.objetos = res as Objeto[];
        console.log(res);
      })
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.objetoService.selectedObjeto = new Objeto();
    }
  }

  borrarObjeto(id: string) {
    if(confirm('¿Seguro que quieres eliminar este objeto?')) {
      this.objetoService.deleteObjeto(id)
      .subscribe(res => {
        console.log(res);
        this.getObjetos();
      })
    }
  }

  editarObjeto(objeto: Objeto) {
    this.objetoService.selectedObjeto = objeto;
  }
  
}
