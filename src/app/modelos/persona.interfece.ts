import { EstadoCivilI } from "./estadocivil.interface";
import { SexoI } from "./sexo.interface";

export interface PersonaI{
    cedula:string;
    nombre:string;
    apellido:string;
    edad:number;
    telefono:string;
    direccion:string;
    idsexo:number;
    idestadocivil:number;
    sexo:SexoI;
    estadoCivil:EstadoCivilI;
}
