import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
	public logged = false;
	constructor(private authService: AuthService) {}

	canActivate() {
		return this.authService.isAuth();
		// devuelve un observable, no va a entrar a la ruta hasta que ese observable resuelva
	}

	// Implementamos el metodo

	canLoad() {
		// return this.authService.isAuth(); // Necesito crear una nueva instancia de este observable.
		// Vamos a pasarlo por el operador pipe de rxjs, y con el operador take() le dice cuantas notificaciones va a emitir
		// el observable antes de cancelar esa subscripción.
		return this.authService.isAuth().pipe(take(1));
	}
}
