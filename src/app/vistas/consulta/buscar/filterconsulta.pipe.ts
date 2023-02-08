import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterconsulta'
})
export class FilterconsultaPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(!args||args.length<3) return value;
    var resultadoPost=[];
    for(var post of value){
      if((post.paciente.persona.nombre +" "+post.paciente.persona.apellido+" "+post.paciente.cedula+" "+post.paciente.numexpediente).toLowerCase().indexOf(args.toLowerCase())>-1)
      {
        resultadoPost.push(post);
      }
    }
    return resultadoPost;
  }


}
