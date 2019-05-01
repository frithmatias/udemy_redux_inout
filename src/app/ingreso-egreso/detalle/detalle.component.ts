import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { ActivarLoadingAction, DesactivarLoadingAction } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
	items: IngresoEgreso[] = [];
	itemsSub: Subscription = new Subscription();
	loading: boolean;
	loadingSub: Subscription = new Subscription();

	constructor(private store: Store<AppState>, private ingresoEgreso: IngresoEgresoService) {
		this.itemsSub = this.store.select('inout').subscribe((data) => {
			console.log(data.items);
			this.items = data.items;
		});
	}

	ngOnInit() {
		this.loadingSub = this.store.select('ui').subscribe((ui) => {
			this.loading = ui.isLoading;
		});
	}

	ngOnDestroy(): void {
		this.itemsSub.unsubscribe();
		this.loadingSub.unsubscribe();
		// Called once, before the instance is destroyed.
		// Add 'implements OnDestroy' to the class.
	}

	borrarItem(uid: string) {
		this.store.dispatch(new ActivarLoadingAction());
		this.ingresoEgreso.borrarIngresoEgreso(uid).then(() => {
			this.store.dispatch(new DesactivarLoadingAction());
			Swal.fire('Ingresos y egresos', 'El ingreso / egreso fue eliminado correctamente', 'success');
		});
	}
}
