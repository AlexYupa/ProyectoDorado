import { FichaDettalleI } from "./fichadetalle.interface";
import { PacienteI } from "./paciente.interface";

export interface HistorialClinicoI{
    cedulapaciente:string;
    codigo:string;
    cedulausuario:string;
    antecedentes:string;
    fechacreacion:Date;
    fechamodificacion:Date;
    tiposangre:string;
    cirujias:string;
    alergias:string;
    paciente:PacienteI;
    fichaDetalle:FichaDettalleI[];
    
}
