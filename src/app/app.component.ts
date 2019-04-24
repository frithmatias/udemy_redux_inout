import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'inOutApp';
	constructor(private afAuth: AngularFireAuth) {
		// puedo llamarlo desde el constructor o desde ngOnInit que es un cilco de vida e mi componente
		// this.initAuthListener();
	}

	ngOnInit() {
		this.initAuthListener();
	}
	initAuthListener() {
		this.afAuth.authState.subscribe((dataUser: any) => {
			console.log(dataUser);
		});
	}
}
