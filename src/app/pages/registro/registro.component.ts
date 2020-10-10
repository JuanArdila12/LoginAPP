import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  onSubmbit( form: NgForm ){

    if ( form.invalid ){
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Creando cuenta',
      text: 'Espere por favor...',
    });

    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp =>{
      console.log(resp)
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message,
      });
    } );
  }

}
