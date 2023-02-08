import { EspecialidadI } from "../modelos/especialidad.interface";

export class Especialidad implements EspecialidadI{
    idespecialidad:number;
    nombreespecialidad:string;
    constructor(){
        this.idespecialidad=1;
        this.nombreespecialidad="";
    };

}