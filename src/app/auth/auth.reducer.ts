import * as fromAuth from './auth.actions';
import { User } from '../models/user.model';

export interface AuthState {
	user: User;
}

const estadoInicial: AuthState = {
	user: null // No tengo datos del usuario todavía puedo inicializarlo en null
};

export function authReducer(state = estadoInicial, action: fromAuth.acciones): AuthState {
	switch (action.type) {
		case fromAuth.SET_USER:
			// return action.user;
			// esto no esta bien porque tengo que regresar un NUEVO usuario y no el que me viene desde
			// las acciones como argumento, ya que en JS los objetos son pasados por referencia.
			return {
				// tengo que romper la relacion que tiene JS con los objetos y extraer todas las propiedades
				// o pares de valores del objeto action.user. Uso el operador spread (...)
				// Esto debe siempre regresar algo del mismo tipo, en esta caso AuthState. AuthState es un tipo
				// de objeto que dentro tiene un tipo User. { user: User }. Si yo hago un return { user: {} }
				// vacío me va a mostrar un error de que no coinciden los tipos.
				user: { ...action.user }
			};
		default:
			return state;
	}
}
