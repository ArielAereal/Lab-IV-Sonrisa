
import {Observable} from 'rxjs';


export class Usuario {

    correo:string;
    clave:string;
    perfil:string;
    rutaF:string | Observable<any>;
}
