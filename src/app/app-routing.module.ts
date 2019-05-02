import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },

	// { // movido a dashboard-routing.module.ts
	// Se implementa canActivate, por lo tanto para cualquier otra ruta debera estar logueado
	// path: '',
	// component: DashboardComponent,
	// children: dashboardRoutes,
	// canActivate: [ AuthGuardService ]
	// },

	{
		// El path que va a usar LazyLoad sera el path vacío.
		path: '',
		// loadChildren: No voy a cargar el módulo IngresoEgresoModule directamente, porque de esa forma no estaría usando LazyLoad.
		loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
		canLoad: [ AuthGuardService ]
	},

	{ path: '**', redirectTo: '' }
];
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
