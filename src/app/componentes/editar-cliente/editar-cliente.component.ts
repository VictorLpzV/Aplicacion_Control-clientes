
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  };

  id:string;

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages:FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value:Cliente, valid:boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente',{
        cssClass:'alert-danger', timeout:4000
      });
    }else{
      value.id = this.id;
      //modificar cliente
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
