import { FichaDettalleI } from "../modelos/fichadetalle.interface";

export class FichaDetalle implements FichaDettalleI{
    idfichadetalle:number;
    cedulapaciente:string;
    idespecialidad:number;
    idmedico:number;
    fechacracion:Date;
    temperatura:string;
    precion:string;
    frecrespiratoria:string;
    pulso:string;
    peso:string;
    alcohol:string;
    ejercicio:string;
    diagnostico:string;
    medicamento:string;
    fuma:string;
    imc:string;
    perimetrocintura:string;
    perimetrobranqual:string;
    perimetropantorrilla:string;
    apetito:string;
    micccion:string;
    sed:string;
    sueno:string;
    talla:string;
    tratamiento:string;

    constructor(){
        this.idfichadetalle=1;
        this.cedulapaciente="";
        this.idespecialidad=1;
        this.idmedico=1;
        this.fechacracion=new Date;
        this.temperatura="";
        this.precion="";
        this.frecrespiratoria="";
        this.pulso="";
        this.peso="";
        this.alcohol="";
        this.ejercicio="";
        this.diagnostico="";
        this.medicamento="";
        this.fuma="";
        this.imc="";
        this.perimetrocintura="";
        this.perimetrobranqual="";
        this.perimetropantorrilla="";
        this.apetito="";
        this.micccion="";
        this.sed="";
        this.sueno="";
        this.talla="";
        this.tratamiento="";
    }
}