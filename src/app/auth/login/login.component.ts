import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
	cargando: boolean;
	subscription: Subscription;
	constructor(public authService: AuthService, private store: Store<AppState>) {
		this.subscription = this.store.select('ui').subscribe((ui) => {
			// console.log(ui); // true o false
			this.cargando = ui.isLoading;
		});
	}

	ngOnInit() {}

	ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscription.unsubscribe();
	}
	submitLogin(data: any) {
		// console.log(data);
		this.authService.login(data.email, data.pass);
	}
}
