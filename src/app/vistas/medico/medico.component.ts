import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { dematerialize } from 'rxjs';
import { EstadoCivilI } from 'src/app/modelos/estadocivil.interface';
import { MedicoI } from 'src/app/modelos/medico.interface';
import { SexoI } from 'src/app/modelos/sexo.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MedicoComponent implements OnInit {

  listMedico:MedicoI[]=[];
  listaSexo:SexoI[]=[];
  listaEstadoCivil:EstadoCivilI[]=[];
  filterPost:String="";
  titulo:String="";
  esNuevo:Boolean=true;
  formViewModel= new FormGroup(
    {
      idmedico: new FormControl('',[Validators.required, Validators.minLength(5)]),
      cedula: new FormControl('',[Validators.required, Validators.minLength(5)]),
      especialidad: new FormControl('',Validators.required),
      dni: new FormControl('',Validators.required),
      nombre:new FormControl('',Validators.required),
      apellido:new FormControl('',Validators.required),
      edad:new FormControl('',Validators.required),
      telefono:new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      idsexo:new FormControl('',Validators.required),
      idestadocivil:new FormControl('',Validators.required)
    }
  );
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService,public modal:NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ChechLogin();
    this.api.ListaEstadoCivil().subscribe(data=>{this.listaEstadoCivil=data});
    this.api.ListaSexo().subscribe(data=>{this.listaSexo=data;});
    this.api.ListaMedico().subscribe(data=>{
      this.listMedico=data;
      console.log(data);
    });
  }
  ChechLogin(){
    //var cooke:Usuario=JSON.parse();
    if(!this.cookieService.check("usuario"))
    {
      this.Router.navigate(["login"]);
      console.log(this.cookieService.getAll());
    }
  }
  Nuevo(contenido:any){
    this.titulo="Nuevo Medico";
    this.formViewModel.setValue(  {
      idmedico: this.nextId(this.listMedico),
      cedula: null,
      especialidad: null,
      dni: null,
      nombre:null,
      apellido:null,
      edad:null,
      telefono:null,
      direccion: null,
      idsexo:1,
      idestadocivil:1
    });
    this.modal.open(contenido);
  }
  Editar(id:any,contenido:any){
    this.titulo="Editar Medico";
    this.api.FindMedicoByCedula(id).subscribe(data=>{
      this.formViewModel.setValue(  {
        idmedico: data.idmedico,
        cedula: data.cedula,
        especialidad: data.especialidad,
        dni: data.dni,
        nombre:data.persona.nombre,
        apellido:data.persona.apellido,
        edad:data.persona.edad,
        telefono:data.persona.telefono,
        direccion: data.persona.direccion,
        idsexo:data.persona.idsexo,
        idestadocivil:data.persona.idestadocivil
      });
    });
    this.modal.open(contenido);
    this.esNuevo=false;
  }
  Eliminar(id:any){
    this.api.DeletMedico(id).subscribe(data=>{
    });
    window.location.reload();
  }
  onsave(){
    if(this.formViewModel.valid)
    {
      if(this.esNuevo){
        this.api.AddMedico(this.medico(this.formViewModel.value)).subscribe(data=>{
          this.modal.dismissAll();
          window.location.reload();
        });
      }
      else
      {
        this.api.EditMedico(this.medico(this.formViewModel.value)).subscribe(data=>{
          this.modal.dismissAll();
          window.location.reload();
        });
      }
    }

  }
  nextId(item:MedicoI[]):number{
    var maxNum:number=0;
    item.forEach(x=>{maxNum= Math.max(x.idmedico)+1});
    return maxNum;
  }
  medico(item:any): MedicoI {
    var data:MedicoI={ 
      idmedico:item.idmedico,
      cedula:item.cedula,
      especialidad:item.especialidad,
      dni:item.dni,
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
