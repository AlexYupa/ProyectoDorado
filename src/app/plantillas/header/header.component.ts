import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioI } from 'src/app/modelos/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private Router:Router,private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  UserInfo(): string {
    if(this.cookieService.check("usuario")){
      var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
      return "Usuario: "+usuario.persona.nombre+" " +usuario.persona.apellido;
    }
    else
    {
      return "Usuario: Sin sesion de usuario"
    }
  }
  UserAdmin():boolean{
    var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
    var result=false;
    if(usuario.administrator==1){
      
      result= true;
    }
    return result;
  }
  UserAut(event:any): void {
    //this.cookieService.deleteAll();      
    this.cookieService.delete("usuario")
    this.Router.navigate(["login"]);
    //alert("Button is clicked");
    //console.log(event);
  }
  IniciarSesion(event:any): void {    
    if(!this.cookieService.check("usuario")){
      this.Router.navigate(["login"]);
    }
  }

}
