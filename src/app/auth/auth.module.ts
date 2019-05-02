import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

@NgModule({
	// NgModule es un método por lo cual necesito usar parentesis()
	declarations: [
		// necesitamos el login y el register
		LoginComponent,
		RegisterComponent
	],
	imports: [
		// Importamos el CommomnModule Para evitar el ERROR: Can't bind to 'ngIf' since it isn't a known property of 'button'
		CommonModule,
		// Los imports son un poco mas complicados, en login y register estamos usando formularios normales
		// es decir de aproximación por template. Si fueran reactivos tendríamos que importar ReactiveFormsModule.
		FormsModule,
		AngularFireAuthModule, // lo traemos de app.module.ts
		RouterModule
	]

	// El servicio auth.service.ts lo tenemos de forma global y esta bien así, pero también podríamos ponerlo en los privoders.
})
export // El decorador se adjunta a otro elemento, puede ser una función pero aquí será una clase.
class AuthModule {}
