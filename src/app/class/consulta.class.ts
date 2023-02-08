import { ConsultaI } from "../modelos/consulta.interface";
import { EspecialidadI } from "../modelos/especialidad.interface";
import { PacienteI } from "../modelos/paciente.interface";
import { Especialidad } from "./especialidad.class";
import { Paciente } from "./paciente.class";

export class Consulta implements ConsultaI{
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
    paciente:PacienteI
    especialidad: EspecialidadI;
    constructor(){
        this.idconsulta=0;
        this.cedulapaciente='';
        this.cedulausuario='';
        this.idespecialidad=0;
        this.idmedico=0;
        this.fechacreacion=new Date;
        this.fechamodificacion=new Date;
        this.activo=0;
        this.detalle='';
        this.diagnostico='';
        this.tratamiento='';
        this.paciente= new Paciente();
        this.especialidad= new  Especialidad();
    }
}