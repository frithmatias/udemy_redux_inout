import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
	authSub: Subscription = new Subscription();
	user: User;

	constructor(private store: Store<AppState>) {}
	ngOnInit() {
		this.authSub = this.store.select('auth').subscribe((auth) => {
			this.user = auth.user;
		});
	}

	ngOnDestroy(): void {
		this.authSub.unsubscribe();
	}
}
