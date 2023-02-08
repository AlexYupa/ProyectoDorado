import { DatoMedicoI } from "./datomedico.interface";

export interface DetalleConsultaI{
    idconsulta:number;
    iddatomedico:number;
    valor:string;
    nota:string;
    datoMedico:DatoMedicoI
}