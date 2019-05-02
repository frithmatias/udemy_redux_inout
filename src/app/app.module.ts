import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';

// Componentes de AUTH movidos a AUTH.MODULE.TS en la modularización de AUTH.
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';

// APP/DASHBOARD movidos al módulo ingreso-egreso.module.ts
// import { DashboardComponent } from './dashboard/dashboard.component';

// APP/INGRESO-EGRESO movidos al módulo ingreso-egreso.module.ts
// import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
// import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
// import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';

// APP/SHARED movido al módulo nuevo shared.module.ts
// import { FooterComponent } from './shared/footer/footer.component';
// import { NavbarComponent } from './shared/navbar/navbar.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';

// PIPES
// movido al módulo ingreso-egreso.module.ts
// import { OrdenIngresoEgresoPipe } from './ingreso-egreso/orden-ingreso-egreso.pipe';

import { AppRoutingModule } from './app-routing.module';

// Formularios reactivos NO los uso en login ni register, los uso en
// ingreso-egreso por lo tanto lo muevo al módulo ingreso-egreso.module.ts
// import { ReactiveFormsModule } from '@angular/forms';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

// NG2 CHARTS ReactiveFormsModule
// movido al módulo ingreso-egreso.module.ts
// import { ChartsModule } from 'ng2-charts';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
// import { uiReducer } from './shared/ui.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Modulos Personalizados
import { AuthModule } from './auth/auth.module';
// import { SharedModule } from './shared/shared.module';

// Quitado temporalmente
// import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';

@NgModule({
	declarations: [
		AppComponent
		// LoginComponent, Login y register los llevo a auth.module.ts en la modularización del módulo auth.
		// RegisterComponent,

		// DashboardComponent, movido a ingreso-egreso.module.ts
		// IngresoEgresoComponent, movido a ingreso-egreso.module.ts
		// EstadisticaComponent, movido a ingreso-egreso.module.ts
		// DetalleComponent, movido a ingreso-egreso.module.ts
		// OrdenIngresoEgresoPipe, movido a ingreso-egreso.module.ts

		// FooterComponent, pasado a shared.module.ts
		// NavbarComponent, pasado a shared.module.ts
		// SidebarComponent pasado a shared.module.ts
	],
	imports: [
		BrowserModule,
		AuthModule,
		// IngresoEgresoModule, // comentado temporalmente
		AppRoutingModule,
		// FormsModule, // lo usamos en los forms login y register, lo muevo a auth.module.ts
		// ReactiveFormsModule, // movido al módulo ingreso-egreso.module.ts
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		// este si lo podemos quitar para ponerlo en los imports del auth.module.ts en la modularización del módulo auth.
		// AngularFireAuthModule,
		// ChartsModule, // movido al módulo ingreso-egreso.module.ts
		// StoreModule.forRoot({ ui: uiReducer }),
		StoreModule.forRoot(appReducers),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production // Restrict extension to log-only mode
		})
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
