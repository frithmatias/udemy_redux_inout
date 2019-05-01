import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';
// Cuando cierro sesión tengo que LIMPIAR los ingresos y egresos de ESE usuario.

export class SetItemsActions implements Action {
	readonly type = SET_ITEMS;
	constructor(public items: IngresoEgreso[]) {}
	// IngresoEgreso[] tiene que ser un array porque voy a recibir un array completo de items del tipo IngresoEgreso
}

export class UnsetItemsActions implements Action {
	readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsActions | UnsetItemsActions;
