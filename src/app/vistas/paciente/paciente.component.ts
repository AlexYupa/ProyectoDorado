import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { EstadoCivilI } from 'src/app/modelos/estadocivil.interface';
import { PacienteI } from 'src/app/modelos/paciente.interface';
import { SexoI } from 'src/app/modelos/sexo.interface';
import { ApiService } from 'src/app/servicios/api/api.service';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PacienteComponent implements OnInit {
  listPaciente:PacienteI[]=[];
  resultado:PacienteI[]=[];
  titulo:String="";
  cedulaPaciente:number=0;
  listaSexo:SexoI[]=[];
  listaEstadoCivil:EstadoCivilI[]=[];
  filterPost:String="";
  pacienteViewModel= new FormGroup(
    {
      cedula: new FormControl('',[Validators.required, Validators.minLength(10)]),
      personacontacto: new FormControl('',Validators.required),
      numexpediente: new FormControl('',Validators.required),
      tiposangre: new FormControl('',Validators.required),
      alergia: new FormControl('',Validators.required),
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
    this.api.ListaPaciente().subscribe(data=>{this.listPaciente=data;
    console.log(data);
    });
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
  NuevoPaciente(contenido:any){
    this.titulo="Nuevo Paciente";
    this.pacienteViewModel.setValue({
        cedula:null,
        personacontacto:null,
        numexpediente:null,
        tiposangre:null,
        alergia:null,
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
  EditarPaciente(cedula:any,contenido:any){
    this.titulo="Editar Paciente";
    this.cedulaPaciente=1;
    this.api.FindPacienteByCedula(cedula).subscribe(data=>{
      this.pacienteViewModel.setValue({
        cedula:data.cedula,
        personacontacto:data.personacontacto,
        numexpediente:data.numexpediente,
        tiposangre:data.tiposangre,
        alergia:data.alergia,
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
  }
  EliminarPaciente(cedula:any){
    this.api.DeletPaciente(cedula).subscribe();
    window.location.reload();
  }
  onsave(){
    var item=this.pacienteViewModel.value;
    if(this.pacienteViewModel.valid)
    {
      var item=this.pacienteViewModel.value;
      console.log(this.paciente(this.pacienteViewModel.value));
      if(this.cedulaPaciente==0){
        this.api.AddPaciente(this.paciente(this.pacienteViewModel.value)).subscribe(data=>{console.log(data);});
        this.modal.dismissAll();
        window.location.reload();
      }
      else{
        this.api.EditPaciente(this.paciente(this.pacienteViewModel.value)).subscribe(data=>{console.log(data);});
        this.modal.dismissAll();
        window.location.reload();
      }
    }
  }

  paciente(item:any): PacienteI {
    var data:PacienteI={ 
      cedula:item.cedula,
      personacontacto:item.personacontacto ,
      numexpediente:item.numexpediente,
      tiposangre:item.tiposangre,
      alergia:item.alergia,
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
  onChangeEvent(event: any){
    if(event.target.value.length>=3){
      this.listPaciente.forEach(item=>{
         if((item.persona.nombre +" "+item.persona.apellido).indexOf(event.target.value)>-1)
         {
           this.resultado.push(item);
         }
      });
      console.log(this.resultado);
    }
  }
  DetalleConsulta(cedula:any){
    //this.Router.navigate(['consulta/'+cedula]);
  }

}
