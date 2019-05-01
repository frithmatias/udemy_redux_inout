import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
	forma: FormGroup;
	tipo = 'ingreso';
	loading: boolean;
	loadingsub: Subscription = new Subscription();

	constructor(private inOut: IngresoEgresoService, private auth: AuthService, private store: Store<AppState>) {}

	ngOnInit() {
		this.loadingsub = this.store.select('ui').subscribe((ui) => {
			this.loading = ui.isLoading;
		});
		this.forma = new FormGroup({
			description: new FormControl('', Validators.required),
			monto: new FormControl(0, Validators.min(0))
		});
	}
	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.loadingsub.unsubscribe();
	}
	crearIngresoEgreso() {
		this.store.dispatch(new ActivarLoadingAction());
		// console.log(this.forma.value); // {description: "Compra de camioneta", monto: 275000}
		// console.log(this.tipo); // "egreso" o "ingreso"

		// Vamos a fusionar estos datos, forma.value y tipo en un objeto.
		const ingresoEgreso = new IngresoEgreso({
			...this.forma.value,
			tipo: this.tipo,
			uid: this.auth.fbUser.uid
			// con el operador spread (...) separo los pares de valores y los mando en forma individual.
			// o bien
			// description: this.forma.controls.description.value,
			// monto: this.forma.controls.monto.value,
			// tipo: this.tipo
		});

		this.inOut
			.guardarIngresoEgreso(ingresoEgreso)
			.then(() => {
				this.store.dispatch(new DesactivarLoadingAction());
				this.forma.reset({ monto: 0 });
				Swal.fire('Ingresos y egresos', 'El ingreso / egreso fue guardado correctamente', 'success');
			})
			.catch((err) => {
				console.log(err, 'Error al guardar el ingreso-egreso.');
			});
	}
}
