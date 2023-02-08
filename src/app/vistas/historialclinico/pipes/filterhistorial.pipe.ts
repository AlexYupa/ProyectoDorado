import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterhistorial'
})
export class FilterhistorialPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(!args||args.length<3) return value;
    var resultadoPost=[];
    for(var post of value){
      if((post.paciente.persona.nombre +" "+post.paciente.persona.apellido).toLowerCase().indexOf(args.toLowerCase())>-1)
      {
        resultadoPost.push(post);
      }
    }
    return resultadoPost;
  }

}
