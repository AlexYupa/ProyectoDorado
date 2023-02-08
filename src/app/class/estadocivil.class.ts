import { EstadoCivilI } from "../modelos/estadocivil.interface";

export class EstadoCivil implements EstadoCivilI{
    idestadocivil:number;
    nombre:string;
    constructor(){
        this.idestadocivil=1;
        this.nombre="";
    }
}