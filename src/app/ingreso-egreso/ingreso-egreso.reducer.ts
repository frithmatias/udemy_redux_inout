import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
	items: IngresoEgreso[]; // Array de ingresos y egresos
}

export interface AppState extends AppState {
	inout: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
	// items: [ { description: 'hola', monto: 1, tipo: 'tal', uid: '0' } ]
	items: []
};

export function ingresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {
	switch (action.type) {
		case fromIngresoEgreso.SET_ITEMS:
			// tengo que hacer un return de la misma estructura que 'export interface IngresoEgresoState{}'
			// ademas tengo que ROMPER la relacion que tenga con el objeto que me devuelve firebase y me
			// devuelva un NUEVO estado.
			// return { items: action.items };
			return {
				items: [
					// el NUEVO array que voy a regresar con los objetos extraídos con map() de 'action'.
					...action.items.map((item) => {
						return { ...item };
					})
				]
			};
		case fromIngresoEgreso.UNSET_ITEMS:
			return { items: [] };
		default:
			return state;
	}
}
