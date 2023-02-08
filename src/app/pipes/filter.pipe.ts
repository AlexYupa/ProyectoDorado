import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(!args||args.length<3) return value;
    var resultadoPost=[];
    for(var post of value){
      if((post.persona.nombre +" "+post.persona.apellido).toLowerCase().indexOf(args.toLowerCase())>-1)
      {
        resultadoPost.push(post);
      }
    }
    return resultadoPost;
  }

}
