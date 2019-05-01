import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class IngresoEgresoService {
	ingresoEgresoListenerSub: Subscription = new Subscription();
	ingresoEgresoItemsSub: Subscription = new Subscription();

	items: any[] = [];

	constructor(private afDB: AngularFirestore, private auth: AuthService, public store: Store<AppState>) {
		// console.log('INGRESO EGRESO SERVICE CONSTRUCTOR');
	}

	// igual a como hicimos initAuthListener() en el auth service.
	// en que momento voy a llamar initIngresoEgresoListener()? podría pensar que debe ser en
	// app.componen.ts pero en ese momento no tengo el uid, es probable que la persona no logre
	// autenticarse. Por lo tanto tengo que hacerlo en el componente el cual el usuario va a entrar
	// luego de autenticarse, y es dashboard.component.ts.
	initIngresoEgresoListener() {
		// Necesito obtener el UID
		// const user = this.auth.getUsuario();
		// No podemos obtenerlo de esta manera ya que al inicializar el dashboard todavía no tengo
		// el user. Vamos a obtenerlo del store.
		// -------------------------
		// 1. La idea es en auth service ESCUCHO los cambios del usuario en firebase, ese usuario lo
		// envío al store.
		//
		// authState.subscribe(fbUser){
		// 			firestore.collection(fbUser).valueChanges().subscribe(){
		// 				store.dispatch(user);
		// }}
		// -------------------------
		// 2. Desde ingreso egreso service, me subscribo al store para escuchar los cambios del usuario
		// sólo para obtener el uid, y con el id consulto a firebase para obtener los ingresos y egresos.
		// Una vez obtenida la data hago un dispatch para enviarlos al STORE.
		//
		// store.subscribe(auth){
		// 		firestore.collection(`${auth.user.uid}/ingresos-egresos/items`).valueChanges().subscribe(ingresosegresos => {
		// 			store.dipsatch(ingresosegresos)
		// 		});
		// }
		// -------------------------

		this.ingresoEgresoListenerSub = this.store
			.select('auth')
			// Si yo observo en la consola voy a ver que existen dos momentos, el primero es cuando obtiene
			// user: NULL, y luego obtiene los datos. Por este motivo debo esperar a obtener los datos, y
			// para eso uso un pipe() que es un operador de rxjs. El pipe me permite transformar la petición
			// o la respuesta en algo diferente concatenando el operador map(), pero lo que me interesa a mi
			// es filtrarla por lo tanto uso el operador filter()
			.pipe(filter((auth) => auth.user != null)) // devuelve el valor cuya condición devuelve TRUE.
			.subscribe((auth) => {
				console.log(auth);
				this.ingresosEgresosItems(auth.user.uid);
			});

		// Con el UID ya puedo hacer la consulta a firebase para obtener los items.
		// pAyXo4DY4HPdsW5V9SkBuwDqexc2 >  <-- uid
		// 	ingreso-egreso >
		// 		items >
		// 			pCYmmGP83gamjf4487zC >
		//			    description: "123123"
		//			    monto: 132312
		//			    tipo: "ingreso"
	}

	private ingresosEgresosItems(uid: string) {
		this.ingresoEgresoItemsSub = this.afDB
			.collection(`${uid}/ingreso-egreso/items`)
			// .valueChanges() // para obtener la data
			.snapshotChanges() // para obtener la metadata y así obtener el id del item
			.pipe(
				map((data) => {
					// esta map() es el de RXJS
					return data.map((doc) => {
						// este map() es el de JavaScript
						return {
							uid: doc.payload.doc.id,
							...doc.payload.doc.data()
						};
					});
				})
			)
			.subscribe((data: any[]) => {
				console.log('Items en ingresos y egresos:', data);
				this.items = data;
				this.store.dispatch(new SetItemsActions(data));
			});
	}

	cancelSubs() {
		this.ingresoEgresoItemsSub.unsubscribe();
		this.ingresoEgresoListenerSub.unsubscribe();
	}

	guardarIngresoEgreso(ingresoEgreso: IngresoEgreso) {
		const user = this.auth.getUsuario();
		return this.afDB.collection(`${user.uid}`).doc('ingreso-egreso').collection('items').add({
			...ingresoEgreso
		});
	}

	borrarIngresoEgreso(ingresoEgreso: string) {
		const user = this.auth.getUsuario();
		return this.afDB
			.collection(`${user.uid}`)
			.doc('ingreso-egreso')
			.collection('items')
			.doc(`${ingresoEgreso}`)
			.delete();
	}
}
