import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './ingresar-gasto.component.html',
  styleUrl: './ingresar-gasto.component.css'
})
export class IngresarGastoComponent {

  nombreGasto: string;
  cantidad: number;
  formularioCorrecto: boolean;
  textIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioCorrecto = false;
    this.textIncorrecto = '';
  }

  agregarGasto() {

    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioCorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
    }


    if(this.nombreGasto === '' || this.cantidad <= 0){
      this.formularioCorrecto = true;
      this.textIncorrecto = 'Gasto o Cantidad incorrecto';
    } else {

      const Gasto = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      this._presupuestoService.agregarGasto(Gasto);

      this.formularioCorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }

}
