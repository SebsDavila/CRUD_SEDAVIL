import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TarjetaService } from '../../../services/tarjeta.service';
import { TarjetaCredito } from 'src/app/models/tarjetacredito.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjetacredito',
  templateUrl: './tarjetacredito.component.html',
  styleUrls: ['./tarjetacredito.component.css'],
})
export class TarjetacreditoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tarjetaService: TarjetaService,
    private toasr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.suscription = this.tarjetaService.obtenerTarjeta().subscribe(data => {
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id;
    });
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  guardarTarjeta() {
    if (this.idTarjeta===0) {
      this.agregar();
    } else {
      this.editar();
    }
  }

  agregar() {
    const TARJETA: TarjetaCredito = {
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value,
    };
    this.tarjetaService.guardarTarjeta(TARJETA).subscribe((data) => {
      this.toasr.success("Registro Agregado", 'La tarjeta fue agregada exitosamente');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    });
  }

  editar() {
    const TARJETA: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value,
    };
    this.tarjetaService.actualizarTarjeta(this.idTarjeta, TARJETA).subscribe(data => {
      this.toasr.info("Registro Actualizado", 'La tarjeta ha sido actualizada exitosamente');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
      this.idTarjeta = 0;
    });
  }
}
