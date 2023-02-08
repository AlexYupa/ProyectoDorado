import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Paciente } from 'src/app/class/paciente.class';
import { ConsultaI } from 'src/app/modelos/consulta.interface';
import { EspecialidadI } from 'src/app/modelos/especialidad.interface';
import { MedicoI } from 'src/app/modelos/medico.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultaComponent implements OnInit {

  paciente:Paciente= new Paciente();
  listItem:ConsultaI[]=[];
  titulo:string="";
  listaEspecialidad:EspecialidadI[]=[];
  listMedico:MedicoI[]=[];
  filterCedula:string="";
  esNuevo:Boolean=true;
  filterPost:string="";
  pageSize:number=10
  desde:number=0;
  hasta:number=10;
  formViewModel=new FormGroup(
    {
      idconsulta: new FormControl(0),
      cedulapaciente:new FormControl(''),
      cedulausuario:new FormControl(''),
      idespecialidad:new FormControl('',Validators.required),
      idmedico:new FormControl('',Validators.required),
      fechacreacion:new FormControl(this.datepipe.transform((new Date), 'yyyy-MM-dd'),Validators.required),
      fechamodificacion:new FormControl(this.datepipe.transform((new Date), 'yyyy-MM-dd')),
      activo:new FormControl(1),
      detalle:new FormControl('',Validators.required),
      diagnostico:new FormControl(''),
      tratamiento:new FormControl('')
    });
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService,public modal:NgbModal,private formBuilder: FormBuilder,public datepipe: DatePipe, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    var idpacientes:string|null=this.activatedRoute.snapshot.paramMap.get('cedula');
    this.ChechLogin();
    this.api.ListaEspecialidad().subscribe(data=>{
      this.listaEspecialidad=data;
    });
    this.api.ListaMedico().subscribe(data=>{
      this.listMedico=data;
    });
    this.api.ListaConsulta().subscribe(data=>{
      this.listItem=data;
      console.log(this.listItem);
    });
    //alert(idpacientes);
  }
  ChechLogin(){
    if(!this.cookieService.check("usuario"))
    {
      this.Router.navigate(["login"]);
      console.log(this.cookieService.getAll());
    }
  }
  Editar(idconsulta:any, contenido:any){
    this.titulo="Editar Consulta";
    //var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
    var item=this.listItem.find(x=>x.idconsulta==idconsulta);
    this.formViewModel.setValue({
      idconsulta: item?.idconsulta,
      cedulapaciente:item?.cedulapaciente,
      cedulausuario:item?.cedulausuario,
      idespecialidad:item?.idespecialidad,
      idmedico:item?.idmedico,
      fechacreacion:this.datepipe.transform(item?.fechacreacion, 'yyyy-MM-dd'),
      fechamodificacion:this.datepipe.transform(item?.fechamodificacion, 'yyyy-MM-dd'),
      activo:item?.activo,
      detalle:item?.detalle,
      diagnostico:item?.diagnostico,
      tratamiento:item?.tratamiento
    });
    this.modal.open(contenido);
    this.esNuevo=false;
  }
  Eliminar(idconsulta:any){
    this.api.DeletConsulta(idconsulta).subscribe();
    window.location.reload();    
  }
  Detalle(idconsulta:any){
    this.Router.navigate(['consulta/'+idconsulta]);
  }
  Nuevo(contenido:any)
  {
    this.titulo="Nueva Consulta";
    var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
   
    this.modal.open(contenido);
    
  }
  onsave(){
    var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
    this.formViewModel.value.cedulausuario=usuario.cedula;
    if(this.esNuevo)
      { 
        this.api.AddConsulta(this.formViewModel.value).subscribe(data=>{
          console.log(data);
          this.modal.dismissAll();
          window.location.reload();
        });
      }
      else{
        this.api.AddConsulta(this.formViewModel.value).subscribe(data=>{
          console.log(data);
          });
          this.modal.dismissAll();
          window.location.reload();
      }
    //console.log(this.formViewModel.value);
  }
  addCedulaMedico(id:any){
    this.formViewModel.get("idmedico")?.setValue(id);
    //alert(id);
  }
  addItem(contenido:any){
    this.modal.open(contenido);
  }
  cambiarpagina(e:PageEvent){
    this.desde=e.pageIndex*e.pageSize;
    this.hasta=this.desde+e.pageSize;
  }
}
