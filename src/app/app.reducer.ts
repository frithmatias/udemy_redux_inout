import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
	ui: fromUI.State;
	auth: fromAuth.AuthState; // tipo objeto de tipo usuario. AuthState { user: User }
	inout: fromIngresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
	// uso = porque es un objeto.
	// acá voy a ir poniendo todos mis reducers.
	ui: fromUI.uiReducer,
	auth: fromAuth.authReducer,
	inout: fromIngresoEgreso.ingresoEgresoReducer
};
