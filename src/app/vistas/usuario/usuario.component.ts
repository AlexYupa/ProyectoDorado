import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { EstadoCivilI } from 'src/app/modelos/estadocivil.interface';
import { SexoI } from 'src/app/modelos/sexo.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UsuarioComponent implements OnInit {

  listItem:UsuarioI[]=[];
  listaSexo:SexoI[]=[];
  listaEstadoCivil:EstadoCivilI[]=[];
  titulo:string='';
  esNuevo:Boolean=true;
  formViewModel= new FormGroup(
    {
      cedula: new FormControl('',[Validators.required, Validators.minLength(10)]),
      user: new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      passwordValidad: new FormControl('',[Validators.required, Validators.minLength(6)]),
      administrator:new FormControl(false),
      nombre:new FormControl('',Validators.required),
      apellido:new FormControl('',Validators.required),
      edad:new FormControl('',Validators.required),
      telefono:new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      idsexo:new FormControl('',Validators.required),
      idestadocivil:new FormControl('',Validators.required)
    }
  );
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService,public modal:NgbModal,private formBuilder: FormBuilder,public datepipe: DatePipe, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.ChechLogin();
    var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
    if(usuario.administrator==1){
      this.api.ListaEstadoCivil().subscribe(data=>{this.listaEstadoCivil=data});
    this.api.ListaSexo().subscribe(data=>{this.listaSexo=data;});
    this.api.ListaUsuario().subscribe(data=>{
      this.listItem=data;
      //console.log(data);
    });
    }
    else{
      this.Router.navigate(['Index']);
    }
  }
  ChechLogin(){
    
    if(!this.cookieService.check("usuario"))
    {
      
      this.Router.navigate(["login"]);
      console.log(this.cookieService.getAll());
      
    }
  }
  Nuevo(contenido:any){
   this.titulo='Nuevo';
   this.modal.open(contenido);

  }
  Editar(id:any,contenido:any){
    this.titulo='Editar';
    this.esNuevo=false;
    var item=this.listItem.find(x=>x.cedula==id);
    this.formViewModel.setValue(
      {
        cedula: item?.cedula,
        user: item?.user,
        password: item?.password,
        passwordValidad: item?.password,
        administrator:item?.administrator==1?true:false,
        nombre:item?.persona.nombre,
        apellido:item?.persona.apellido,
        edad:item?.persona.edad,
        telefono:item?.persona.telefono,
        direccion: item?.persona.direccion,
        idsexo:item?.persona.idsexo,
        idestadocivil:item?.persona.idestadocivil
      });
      this.modal.open(contenido);
  }
  Eliminar(id:any)
  {
    this.api.DeletUsuario(id).subscribe();
    window.location.reload();
  }
  onsave(){
    if(this.esNuevo){
      if(this.formViewModel.value.password==this.formViewModel.value.passwordValidad){
        this.usuario(this.formViewModel.value);
        console.log(this.usuario(this.formViewModel.value));
        this.api.AddUsuario(this.usuario(this.formViewModel.value)).subscribe(
          data=>{
            console.log(data);
            this.modal.dismissAll();
            window.location.reload();
          }
        );

      }
      else{
        alert("Las contraseña no son iguales");
      }
    }
    else{
      if(this.formViewModel.value.password==this.formViewModel.value.passwordValidad){
        this.usuario(this.formViewModel.value);
        console.log(this.usuario(this.formViewModel.value));
        this.api.EditUsuario(this.usuario(this.formViewModel.value)).subscribe(
          data=>{
            console.log(data);
            this.modal.dismissAll();
            window.location.reload();
          }
        );

      }
      else{
        alert("Las contraseña no son iguales");
      }
    }

  }
  usuario(item:any): UsuarioI {
    var data:UsuarioI={ 
      cedula:item.cedula,
      user:item.user,
      password:item.password,
      administrator:item.administrator==true?1:0,
      persona:{
        cedula:item.cedula,
        nombre:item.nombre,
        apellido:item.apellido,
        edad:item.edad,
        telefono:item.telefono,
        direccion:item.direccion,
        idsexo:item.idsexo,
        idestadocivil:item.idestadocivil,
        sexo:{
          idsexo:item.idsexo,
          nombre:""
        },
        estadoCivil:{
          idestadocivil:item.idestadocivil,
          nombre:""
        }
      }
    }
    return data;
  }
}
