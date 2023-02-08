import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillPacienteByCedula'
})
export class FillPacienteByCedulaPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(!args||args.length<10) return value;
    var resultadoPost=[];
    for(var post of value){
      //(post.nombre +" "+post.apellido).toLowerCase().indexOf(args.toLowerCase())>-1||
      if(post.persona.cedula.indexOf(args)>-1)
      {
        resultadoPost.push(post);
        console.log(post);
      }
    }
    return resultadoPost;
  }

}
