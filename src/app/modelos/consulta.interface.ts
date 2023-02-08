import { EspecialidadI } from "./especialidad.interface";
import { PacienteI } from "./paciente.interface";

export interface ConsultaI{
    idconsulta:number;
    cedulapaciente:string;
    cedulausuario:string;
    idespecialidad:number;
    idmedico:number;
    fechacreacion:Date;
    fechamodificacion:Date;
    activo:number;
    detalle:string;
    diagnostico:string;
    tratamiento:string;
    paciente:PacienteI;
    especialidad:EspecialidadI;
}