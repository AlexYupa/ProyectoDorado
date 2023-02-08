import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginI } from 'src/app/modelos/login.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { UsuarioViewModelI } from 'src/app/modelos/usurioviewmodel.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm= new FormGroup({
    user: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  errorStatus:boolean=false;
  errorMsj:any="";
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.ChechLogin();
  }
  ChechLogin(){
    //var cooke:Usuario=JSON.parse(this.cookieService.get('usuario'));
    if(this.cookieService.check("usuario")){
      this.Router.navigate(["Index"]);
      // this.cookieService.delete('dataRespose');
    }
  }
  onLogin(form:LoginI){

    this.api.IniciarSesion(form).subscribe(
      data=>{
        var dataRespose:UsuarioViewModelI=data;
        if(dataRespose.status=='200'){
          var usuario:UsuarioI =dataRespose.usuario;
          this.cookieService.set('usuario', JSON.stringify(usuario)); 
          this.Router.navigate(["persona"]);
        }
        else
        {
          this.errorStatus=true;
          this.errorMsj=dataRespose.error;
        }
      }
    )
  }

}
