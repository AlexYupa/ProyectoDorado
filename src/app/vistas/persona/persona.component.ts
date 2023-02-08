import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { EstadoCivilI } from 'src/app/modelos/estadocivil.interface';
import { PersonaI } from 'src/app/modelos/persona.interfece';
import { SexoI } from 'src/app/modelos/sexo.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class PersonaComponent implements OnInit {

  listPersona:PersonaI[]=[];
  listaSexo:SexoI[]=[];
  listaEstadoCivil:EstadoCivilI[]=[];
  titulo:String="";
  cedulaPersona:number=0;
  personaForm= new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.minLength(5)]),
    nombre: new FormControl('',Validators.required),
    apellido: new FormControl('',Validators.required),
    edad: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    idsexo:new FormControl('',Validators.required),
    idestadocivil:new FormControl('',Validators.required)
  });
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService,public modal:NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ChechLogin();
    this.api.ListaPersona().subscribe(data=>{this.listPersona=data;});
    this.api.ListaSexo().subscribe(data=>{this.listaSexo=data;});
    this.api.ListaEstadoCivil().subscribe(data=>{this.listaEstadoCivil=data});
  }
  ChechLogin(){
    //var cooke:Usuario=JSON.parse();
    if(!this.cookieService.check("usuario"))
    {
      this.Router.navigate(["login"]);
      console.log(this.cookieService.getAll());
    }
  }
  EditarPersona(cedula:any,contenido:any){
    this.api.FindPersonaByCedula(cedula).subscribe(data=>{
      this.cedulaPersona=1;
      this.titulo="Editar Persona";
      this.personaForm.setValue({
        'cedula':data.cedula,
        'nombre':data.nombre,
        'apellido':data.apellido,
        'edad':data.edad,
        'telefono':data.telefono,
        "direccion":data.direccion,
        'idsexo':data.idsexo,
        'idestadocivil':data.idestadocivil
      });
      console.log(data);
    });
    this.modal.open(contenido);

      //this.idEliminar=id;
  }
  NuevoPersona(contenido:any){
    this.modal.open(contenido);
    this.titulo="Nueva Persona";
    this.personaForm.setValue({
      'cedula':null,
      'nombre':null,
      'apellido':null,
      'edad':null,
      'telefono':null,
      "direccion":null,
      'idsexo':1,
      'idestadocivil':1
    });
  }
  EliminarPersona(cedula:any){
    console.log(cedula);
    this.api.DeletPersona(cedula).subscribe(data=>{console.log(JSON.parse(data));});
    window.location.reload();

  }
  onsave(){
   if(this.personaForm.valid)
   {
     console.log(this.personaForm);
     if(this.cedulaPersona==0)
     {
      this.api.AddPersona(this.personaForm.value).subscribe(data=>{console.log(data);});
      this.modal.dismissAll();
        window.location.reload();
     }
     else{
      this.api.EditPersona(this.personaForm.value).subscribe(data=>{console.log(data);});
      this.modal.dismissAll();
        window.location.reload();
     }
   }
   
  }
  public getError(controlName: string): string {
    let error = '';
    let control = this.personaForm.get(controlName);
    if (control?.touched && control.errors != null) {
      error = control.status;
    }
    return error;
  }

}
