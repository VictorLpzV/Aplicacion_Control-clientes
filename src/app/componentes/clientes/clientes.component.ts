import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  };

  @ViewChild("clienteForm")clienteForm: NgForm;

  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor(private clienteServicio:ClienteServicio, private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal() {
    let saldoTotal:number = 0;
    if( this.clientes ) {
      this.clientes.forEach( cliente => {
        if( cliente.saldo ) {
          saldoTotal += cliente.saldo;
        }
      } )
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value:Cliente, valid:boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
     this.clienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
