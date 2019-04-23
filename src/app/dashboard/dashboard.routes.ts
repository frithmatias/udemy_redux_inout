/*
Este archivo de rutas podría ser también un módulo, como el app-routing.module.ts
en donde exporto la clase de la forma, export class AppRoutingModule {}
Y luego la importo en los imports de app.module.ts,
imports: [ BrowserModule, AppRoutingModule ]
Pero mejor lo voy a hacer como un archivo de rutas, y no un módulo. De modo que luego 
en el módulo padre de rutas configuro mis rutas hijas. 

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: '',
		component: DashboardComponent,
		children: dashboardRoutes
	},
	{ path: '**', redirectTo: '' }
];
*/

import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
	{ path: '', component: EstadisticaComponent },
	{ path: 'ingreso-egreso', component: IngresoEgresoComponent },
	{ path: 'detalle', component: DetalleComponent }
];
