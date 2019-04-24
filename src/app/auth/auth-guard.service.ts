import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	public logged = false;
	constructor(private authService: AuthService) {}

	canActivate() {
		return this.authService.isAuth();
		// devuelve un observable, no va a entrar a la ruta hasta que ese observable resuelva
	}
}
