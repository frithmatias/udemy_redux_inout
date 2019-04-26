import * as fromUi from './ui.actions';

// Cual va a ser el estado de mi UI, que va a ser la parte de la interfaz de usuario.
// Como es probable que a futuro agrega mas propiedades lo ideal va a ser manejarlo
// como un objeto. Si necesito sólo saber si se esta cargando podría haber manejado
// el dato sólo como un booleano.

export interface State {
	isLoading: boolean;
	// acá puedo agregar propiedades.
}

const initState: State = {
	isLoading: false
};

export function uiReducer(state = initState, action: fromUi.acciones): State {
	// :State Devuelve algo de tipo State, que esta definido en la interfaz.
	switch (action.type) {
		case fromUi.ACTIVAR_LOADING:
			return {
				// ... Si mi estado State tuviera mas propiedades, acá debería usar el operador spread para extraerlas todas.
				isLoading: true
			};

		case fromUi.DESACTIVAR_LOADING:
			return {
				// ...
				isLoading: false
			};

		default:
			// si no sucede ningún cambio en el state, devuelvo el state así como esta.
			return state;
	}
}
