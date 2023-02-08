import { PacienteI } from "../modelos/paciente.interface";
import { Persona } from "./persona.class";

export class Paciente implements PacienteI{
    cedula:string;
    personacontacto:string;
    numexpediente:string;
    tiposangre:string;
    alergia:string;
    persona:Persona;
    
    constructor() {
        this.cedula="";
        this.personacontacto=""
        this.numexpediente="";
        this.tiposangre="";
        this.alergia="";
        this.persona= new Persona(); 
    }
}