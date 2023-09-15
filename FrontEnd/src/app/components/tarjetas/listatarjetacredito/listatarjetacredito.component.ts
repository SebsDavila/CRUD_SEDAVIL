import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetacredito.model';

@Component({
  selector: 'app-listatarjetacredito',
  templateUrl: './listatarjetacredito.component.html',
  styleUrls: ['./listatarjetacredito.component.css']
})
export class ListatarjetacreditoComponent implements OnInit {

  constructor(
    public tarjetaService: TarjetaService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetas();
  }

  eliminarTarjeta(id: number) {
    if (confirm("Esta seguro que desea eliminar el registro?")) {
      this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
        this.toastr.warning("Registro Eliminado", "La tarjeta fue eliminada exitosamente");
        this.tarjetaService.obtenerTarjetas();
      })
    }
  }

  editar(tarjeta: TarjetaCredito){
    this.tarjetaService.actualizar(tarjeta);
  }
}
