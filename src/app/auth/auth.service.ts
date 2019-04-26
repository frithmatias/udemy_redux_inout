import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

// SWEET ALERT
import Swal from 'sweetalert2';

// FIREBASE
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

// NGRX: Accion
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';

// RXJS
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	//  private subscription: Subscription;
	private subscription: Subscription = new Subscription();
	constructor(
		private afDB: AngularFirestore,
		private afAuth: AngularFireAuth,
		private router: Router,
		private store: Store<AppState>
	) {
		// this.initAuthListener();
		// Para authState es conveniente hacer la subscripción en app.component.ts ya que debe estar en un metodo
		// el cual sea llamado sólo una vez al iniciar la aplicación.
	}

	initAuthListener() {
		console.log('Subscribiendo a authState desde auth.service');
		this.afAuth.authState.subscribe((fbUser: firebase.User) => {
			console.log('fbUser:', fbUser); // Objeto con toda la info que me devuelve firebase

			if (fbUser) {
				this.afDB.collection('users').doc(`${fbUser.uid}`).valueChanges().subscribe((usuarioObj: any) => {
					console.log('usuarioObj:', usuarioObj);

					// usuarioObj NO es del tipo User, asi que creamos newUser de tipo User.
					// const newUser = new User(usuarioObj.nombre, usuarioObj.email, usuarioObj.uid);

					// Pero existe una forma para poder enviarle un objeto al modelo para no enviar todos los argumentos.
					// Ver mas abajo como esta definido el modelo USER.MODEL.TS.

					const newUser = new User(usuarioObj);
					this.store.dispatch(new SetUserAction(newUser));
					console.log('newUser:', newUser);
				});
			} else {
				// Si yo me logueo con un usuario, luego hago un logout, y hago un login con OTRO usuario, voy a estar
				// subscrito DOS VECES a DOS OBSERVABLES. Si hago cambios en cualquiera de esos dos usuarios voy a estar
				// viendo sus cambios porque nunca me des suscirbi.

				this.subscription.unsubscribe();

				// Pero todavía hay un problema, si yo NO estoy autenticado, me va a dar un error que unsuscribe es undefined.
				// core.js:12501 ERROR TypeError: Cannot read property 'unsubscribe' of undefined
				// Para eso vamos a instanciar nuestra variable subscription.

				// --   private subscription: Subscription;
				// ++   private subscription: Subscription = new Subscription();
			}
		});
	}

	crearUsuario(nombre: string, email: string, password: string) {
		// Redux actualizao el estado de isLoading.
		let action = new ActivarLoadingAction();
		this.store.dispatch(action);
		// o bien this.store.dispatch( new ActivarLoadingAction() );

		this.afAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then((resp) => {
				Swal.fire('Bienvenido!', 'El usuario fue guardado correctamente en Firebase', 'success');

				/*
				const newUser: User = new User(nombre, email, password);
				para crear el objeto newUser yo tengo que enviarle el nombre, email y pass, todos esos datos
				los tengo en la respuesta 'resp', y de esa forma tendría que enviar todos los argumentos manualmente.
        		Vamos a hacerlo de otra forma, vamos a asignarle a 'user' los valores como si fuera una simple
				INTERFASE y no un objeto de la clase User.
				*/

				const user: User = {
					uid: resp.user.uid,
					nombre: nombre,
					email: email
				};

				this.afDB.collection('users').doc(`${user.uid}`).set(user).then(() => {
					// this.afDB.firestore.collection('users').add(user).then(() => { // funciona perfectamente
					// this.afDB.doc(`${user.uid}/usuario`).set(user).then(() => {

					// de esta manera tengo el uid de Authentication -> Usuarios, en mi nueva colección con los datos
					// del nuevo usuario.

					console.log(resp);
					this.router.navigate([ '/' ]); // quiero navegar al Dashboard.

					// Redux actualizao el estado de isLoading.
					action = new DesactivarLoadingAction();
					this.store.dispatch(action);
				});
			})
			.catch((error) => {
				this.store.dispatch(new DesactivarLoadingAction());
				Swal.fire('Error', error.message, 'error');

				console.log(error);
			});
	}

	login(email: string, password: string) {
		this.store.dispatch(new ActivarLoadingAction());

		this.afAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then((resp) => {
				Swal.fire('Bienvenido!', 'El usuario fue logueado correctamente', 'success');
				this.router.navigate([ '/' ]);

				// console.log('LOGIN():', resp);
				// resp contiene un objeto con info del usuario logueado y además como una propiedad otro objeto
				// que es el mismo objeto devuelto por authState() en la subscripcion al observable en initAuthListener()
				// guardado en 'fbUser', con el fin de controlar el estado del usuario

				this.store.dispatch(new DesactivarLoadingAction());
			})
			.catch((error) => {
				Swal.fire('Error', error.message, 'error');
				console.log('Error', error);
				this.store.dispatch(new DesactivarLoadingAction());
			});
	}

	logout() {
		this.router.navigate([ '/login' ]);
		this.afAuth.auth.signOut(); // Si hago un console.log del then() retorna 'undefined' ya que la promesa no retorna nada.
	}

	isAuth() {
		return this.afAuth.authState.pipe(
			map((fbUser) => {
				if (fbUser == null) {
					this.router.navigate([ '/login' ]);
				}
				return fbUser != null;
			})
		);
	}
}
