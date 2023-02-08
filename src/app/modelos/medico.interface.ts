import { PersonaI } from "./persona.interfece";

export interface MedicoI{
    idmedico:number;
    cedula:string;
    especialidad:string;
    dni:string;
    persona:PersonaI;
}