import { TipoDatoMedicoI } from "./tipodatomedico.inteface";

export interface DatoMedicoI{
    iddatomedico:number;
    idtipodatomedico:number;
    idespecialida:number;
    detalle:string;
    tipoDatoMedico:TipoDatoMedicoI
}