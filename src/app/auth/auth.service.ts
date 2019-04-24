import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
		// this.initAuthListener();
		// Parha authState es conveniente hacer la subscripción en app.component.ts ya que debe estar en un metodo
		// el cual sea llamado sólo una vez al iniciar la aplicación.
	}

	crearUsuario(nombre: string, email: string, password: string) {
		this.afAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then((resp) => {
				Swal.fire('Bienvenido!', 'El usuario fue guardado correctamente en Firebase', 'success');

				/*
				const newUser: User = new User(nombre, email, password);
				para crear el objeto newUseryo tengo que enviarle el nombre, email y pass, todos esos datos
				los tengo en la respuesta 'resp', y de esa forma tendría que enviar todos los argumentos manualmente.
        Vamos a hacerlo de otra forma, vamos a asignarle a 'user' los valores como si fuera una simple
        INTERFASE y no un objeto de la clase User.
        */

				const user: User = {
					uid: resp.user.uid,
					nombre: nombre,
					email: email
				};

				this.afs.collection('users').add(user).then(() => {
					// this.afs.firestore.collection('users').add(user).then(() => { // funciona perfectamente
					// this.afs.doc(`${user.uid}/usuario`).set(user).then(() => {

					// de esta manera tengo el uid de Authentication -> Usuarios, en mi nueva colección con los datos
					// del nuevo usuario.

					console.log(resp);
					this.router.navigate([ '/' ]); // quiero navegar al Dashboard.
				});
			})
			.catch((error) => {
				Swal.fire('Error', error.message, 'error');

				console.log(error);
			});
	}

	login(email: string, password: string) {
		this.afAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then((resp) => {
				Swal.fire('Bienvenido!', 'El usuario fue logueado correctamente', 'success');
				this.router.navigate([ '/' ]);
				console.log('Respuesta de .signInWithEmailAndPassword:', resp);
			})
			.catch((error) => {
				Swal.fire('Error', error.message, 'error');
				console.log('Error', error);
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
