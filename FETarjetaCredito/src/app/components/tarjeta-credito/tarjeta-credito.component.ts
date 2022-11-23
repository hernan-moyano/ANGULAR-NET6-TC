import { Component, OnInit } from '@angular/core';
//se debe importar lo que se usa de angular forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [];
  accion = 'Agregar';
form: FormGroup;
  id : number | undefined;
  constructor(private fb:FormBuilder,
    private _tarjetaService: TarjetaService
    ) {
    
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['',[Validators.required,Validators.maxLength(16), Validators.minLength(16),Validators.pattern("^[0-9]*$")]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
      CVV: ['',[Validators.required,  Validators.maxLength(3),Validators.minLength(3)]]
    })
   }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjeta().subscribe(data =>{
      console.log(data);
      this.listTarjetas= data;
    },error => {console.log(error);
    })
  }

  guardarTarjeta(){    
    const tarjeta: any ={
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      CVV: this.form.get('CVV')?.value
    }
    if (this.id == undefined) {
      //Se agrega una nueva tarjeta
      this._tarjetaService.savetTarjeta(tarjeta).subscribe(data =>{      
        this.form.reset();
        this.obtenerTarjetas();
      },error => {
        console.log(error);
      })   
    } else {
      tarjeta.id = this.id;
      //edita tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{    
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;  
        this.obtenerTarjetas();
      },error => {
        console.log(error);
      })
    }   
  }
  editarTarjeta(tarjeta: any){
    this.accion = 'Editar';    
    this.id = tarjeta.id;

    this.form.patchValue({
      titular : tarjeta.titular,
      numeroTarjeta:  tarjeta.numeroTarjeta,
      fechaExpiracion : tarjeta.fechaExpiracion,
      CVV : tarjeta.CVV
    })    
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data =>{      
      this.obtenerTarjetas();
    },error => {
      console.log(error);
    })
  }

}
