import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
	items: IngresoEgreso[]; // Array de ingresos y egresos
}

const estadoInicial: IngresoEgresoState = {
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
