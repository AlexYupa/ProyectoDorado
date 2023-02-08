import { PersonaI } from "../modelos/persona.interfece";
import { EstadoCivil } from "./estadocivil.class";
import { Sexo } from "./sexo.class";

export class Persona implements PersonaI{
    cedula:string;
    nombre:string;
    apellido:string;
    edad:number;
    telefono:string;
    direccion:string;
    idsexo:number;
    idestadocivil:number;
    sexo:Sexo;
    estadoCivil:EstadoCivil;
    constructor(){
        this.cedula="";
        this.nombre="";
        this.apellido="";
        this.edad=1;
        this.telefono="";
        this.direccion="";
        this.idsexo=1;
        this.idestadocivil=1
        this.sexo=new Sexo();
        this.estadoCivil= new EstadoCivil()

    }
}
