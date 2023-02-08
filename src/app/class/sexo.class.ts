import { SexoI } from "../modelos/sexo.interface";

export class Sexo implements SexoI{
    idsexo:number;
    nombre:string;
    constructor(){
        this.idsexo=1;
        this.nombre="";
    };
}