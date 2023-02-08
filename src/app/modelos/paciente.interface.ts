import { PersonaI } from "./persona.interfece";

export interface PacienteI{
    cedula:string;
    personacontacto:string;
    numexpediente:string;
    tiposangre:string;
    alergia:string;
    persona:PersonaI;
}