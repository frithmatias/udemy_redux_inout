import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
	authSub: Subscription = new Subscription();
	user: User;
	constructor(private authService: AuthService, private store: Store<AppState>) {}

	ngOnInit() {
		this.authSub = this.store.select('auth').subscribe((auth) => {
			this.user = auth.user;
		});
		// o bien
		// this.user = this.authService.getUsuario();
	}

	ngOnDestroy(): void {
		this.authSub.unsubscribe();
	}

	logout() {
		this.authService.logout();
	}
}
