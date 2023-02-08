import { PersonaI } from "./persona.interfece";

export interface UsuarioI {
    cedula: string;
    user: string;
    password: string;
    administrator: number;
    persona:PersonaI
}