import { HistorialClinicoI } from "../modelos/historialclinico.interface";
import { FichaDetalle } from "./fichadetalle.class";
import { Paciente } from "./paciente.class";

export class HistorialClinico implements HistorialClinicoI{
    cedulapaciente:string;
    codigo:string;
    cedulausuario:string;
    antecedentes:string;
    fechacreacion:Date;
    fechamodificacion:Date;
    tiposangre:string;
    cirujias:string;
    alergias:string;
    paciente:Paciente;
    fichaDetalle:FichaDetalle[];
    constructor() {
        this.cedulapaciente="";
        this.codigo="";
        this.cedulausuario="";
        this.antecedentes="";
        this.fechacreacion=new Date;
        this.fechamodificacion=new Date;
        this.tiposangre="";
        this.cirujias="";
        this.alergias="";
        this.paciente= new Paciente();
        this.fichaDetalle=[new FichaDetalle()];
    }
}
