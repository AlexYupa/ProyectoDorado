import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { HistorialClinicoI } from 'src/app/modelos/historialclinico.interface';
import { PacienteI } from 'src/app/modelos/paciente.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-historialclinico',
  templateUrl: './historialclinico.component.html',
  styleUrls: ['./historialclinico.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HistorialclinicoComponent implements OnInit {

  listItem:HistorialClinicoI[]=[];
  listPaciente:PacienteI[]=[];
  filterPost:string="";
  filterCedula:string="";
  esNuevo:Boolean=true;
  titulo:string="";
  formViewModel= new FormGroup(
    {
      cedulapaciente: new FormControl('',[Validators.required, Validators.minLength(5)]),
      codigo: new FormControl('',Validators.required),
      cedulausuario:new FormControl(''),
      antecedentes: new FormControl('',Validators.required),
      fechacreacion: new FormControl('',Validators.required),
      fechamodificacion:new FormControl(''),
      tiposangre:new FormControl('',Validators.required),
      cirujias:new FormControl('',Validators.required),
      alergias:new FormControl('',Validators.required)
    }
  );
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService,public modal:NgbModal,private formBuilder: FormBuilder,public datepipe: DatePipe, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.ChechLogin();
    this.api.ListaHistorialClinico().subscribe(data=>{
      console.log(data)
      this.listItem=data
    });
    this.api.ListaPaciente().subscribe(data=>{this.listPaciente=data;});
  }
  ChechLogin(){
    if(!this.cookieService.check("usuario"))
    {
      this.Router.navigate(["login"]);
      console.log(this.cookieService.getAll());
    }
  }
  Nuevo(contenido:any){
    this.titulo="Nuevo";
    this.modal.open(contenido);
  }
  Editar(cedula:any,contenido:any){
    this.titulo="Editar";
    console.log(cedula);
    this.api.FindHistorialClinicoByCedula(cedula).subscribe(data=>{
      this.formViewModel.setValue(
        {
          cedulapaciente: data.cedulapaciente,
          codigo: data.codigo,
          cedulausuario:data.cedulapaciente,
          antecedentes: data.antecedentes,
          fechacreacion: this.datepipe.transform((data.fechacreacion), 'yyyy-MM-dd') ,
          fechamodificacion:data.fechamodificacion,
          tiposangre:data.tiposangre,
          cirujias:data.cirujias,
          alergias:data.alergias
        }
      );
    });
    this.esNuevo=false;
    this.modal.open(contenido);
  }
  Eliminar(cedula:any){
    this.api.DeletHistorialClinico(cedula).subscribe(data=>{
    });
    window.location.reload();
  }
  onsave(){
    var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
    if(usuario!=null)
    {
      this.formViewModel.value.cedulausuario=usuario.cedula;
      this.formViewModel.value.fechamodificacion= this.datepipe.transform((new Date), 'yyyy-MM-dd');
      if(this.esNuevo)
      {    
          if(this.listItem.filter(x=>x.cedulapaciente==this.formViewModel.value.cedulapaciente)==null ||this.listItem.length>=0){
            this.api.AddHistorialClinico(this.formViewModel.value).subscribe(data=>{console.log(data)});
            this.modal.dismissAll();
            window.location.reload();
          }
          else
          {
            this.modal.dismissAll();
            alert("El paciente ya tiene una ficha activa");
          }
      }
      else
      {
        this.api.EditHistorialClinico(this.formViewModel.value).subscribe();
        this.modal.dismissAll();
        window.location.reload();
      }
   }
  }
  addItem(contenidoPersona:any)
  {
    this.modal.open(contenidoPersona);
  }
  addCedulaPaciente(cedula:any){
    this.formViewModel.get("cedulapaciente")?.setValue(cedula);
  }
  fichaDetalle(cedula:any){
    this.Router.navigate(['fichadetalle/'+cedula]);
  }

}
