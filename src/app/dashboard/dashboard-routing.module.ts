import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from '../auth/auth-guard.service';
// import { CommonModule } from '@angular/common'; // lo puedo quitar no voy a trabajar con ngFor ngIf

const childRoutes: Routes = [
	{
		// Se implementa canActivate, por lo tanto para cualquier otra ruta debera estar logueado
		path: '',
		component: DashboardComponent,
		children: dashboardRoutes
		// canActivate: [ AuthGuardService ]
	}
];

@NgModule({
	declarations: [],
	imports: [ RouterModule.forChild(childRoutes) ], // forRoot esta en mi módulo de rutas principal app-routing.module.ts.
	exports: [ RouterModule ] // Le digo a angular que tiene este modulo de rutas disponible.
})
export class DashboardRoutingModule {}
