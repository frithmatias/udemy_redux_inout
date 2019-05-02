import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';
import * as fromIntresoEgreso from '../ingreso-egreso.reducer';

@Component({
	selector: 'app-estadistica',
	templateUrl: './estadistica.component.html',
	styles: []
})
export class EstadisticaComponent implements OnInit {
	ingresos: number;
	egresos: number;
	cuantosIngresos: number;
	cuantosEgresos: number;
	inOutSub: Subscription = new Subscription();
	public doughnutChartLabels: Label[] = [ 'Ingresos', 'Egresos' ];
	public doughnutChartData: MultiDataSet = [];
	constructor(private store: Store<fromIntresoEgreso.AppState>) {}

	ngOnInit() {
		this.inOutSub = this.store.select('inout').subscribe((ingresoEgreso) => {
			this.contarIngresoEgreso(ingresoEgreso.items);
		});
	}

	contarIngresoEgreso(items: IngresoEgreso[]) {
		this.ingresos = 0;
		this.egresos = 0;
		this.cuantosIngresos = 0;
		this.cuantosEgresos = 0;
		items.forEach((item) => {
			if (item.tipo === 'ingreso') {
				this.cuantosIngresos++;
				this.ingresos += item.monto;
			}
			if (item.tipo === 'egreso') {
				this.cuantosEgresos++;
				this.egresos += item.monto;
			}
		});
		this.doughnutChartData = [ [ this.ingresos, this.egresos ] ];
	}
}
