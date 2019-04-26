export class User {
	public nombre: string;
	public email: string;
	public uid: string;
	// Para recibir un objeto en lugar de argumentos

	// constructor(nombre: string, email: string, uid: string) {
	constructor(obj: DataObj) {
		// this.nombre = nombre;
		// this.email = email;
		// this.uid = uid;

		this.nombre = (obj && obj.nombre) || null;
		this.email = (obj && obj.email) || null;
		this.uid = (obj && obj.uid) || null;
	}
}

// Para recibir un objeto en lugar de argumento declaro la interface DataObj
interface DataObj {
	uid: string;
	email: string;
	nombre: string;
}
