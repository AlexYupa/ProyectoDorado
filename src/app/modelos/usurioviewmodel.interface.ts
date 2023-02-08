import { UsuarioI } from "./usuario.interface";

export interface UsuarioViewModelI{
    error:string;
    status:string;
    usuario:UsuarioI;
}