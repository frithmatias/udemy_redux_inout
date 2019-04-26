import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(public authService: AuthService, private store: Store<AppState>) {}
	cargando: boolean;
	subscription: Subscription;
	ngOnInit() {
		this.subscription = this.store.select('ui').subscribe((ui) => {
			this.cargando = ui.isLoading;
		});
	}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscription.unsubscribe();
	}
	onSubmit(data: any) {
		console.log(data);
		this.authService.crearUsuario(data.nombre, data.email, data.password);
	}
}
