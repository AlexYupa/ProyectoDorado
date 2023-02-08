import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { HistorialClinico } from 'src/app/class/historialclinico.class';
import { HistorialClinicoI } from 'src/app/modelos/historialclinico.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-fichadetalle',
  templateUrl: './fichadetalle.component.html',
  styleUrls: ['./fichadetalle.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FichadetalleComponent implements OnInit {
  historialClinico:HistorialClinico= new HistorialClinico();
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService, private activatedRoute:ActivatedRoute,public modal:NgbModal,public datepipe: DatePipe) { }
  esNuevo:Boolean=true;
  titulo:string="";
  formViewModel= new FormGroup(
    {
      idfichadetalle: new FormControl('',Validators.required),
      cedulapaciente:new FormControl('',Validators.required),
      idespecialidad:new FormControl('',Validators.required),
      idmedico:new FormControl('',Validators.required),
      fechacracion:new FormControl('',Validators.required),
      temperatura:new FormControl('',Validators.required),
      precion:new FormControl('',Validators.required),
      frecrespiratoria:new FormControl('',Validators.required),
      pulso:new FormControl('',Validators.required),
      peso:new FormControl('',Validators.required),
      alcohol:new FormControl('',Validators.required),
      ejercicio:new FormControl('',Validators.required),
      diagnostico:new FormControl(''),
      medicamento:new FormControl(''),
      fuma:new FormControl('',Validators.required),
      imc:new FormControl('',Validators.required),
      perimetrocintura:new FormControl('',Validators.required),
      perimetrobranqual:new FormControl('',Validators.required),
      perimetropantorrilla:new FormControl('',Validators.required),
      apetito:new FormControl('',Validators.required),
      micccion:new FormControl('',Validators.required),
      sed:new FormControl('',Validators.required),
      sueno:new FormControl('',Validators.required),
      talla:new FormControl('',Validators.required),
      tratamiento:new FormControl(''),
    });
  ngOnInit(): void {
    var idpacientes:string|null=this.activatedRoute.snapshot.paramMap.get('cedula');
    if(idpacientes!=null){
      this.api.FindHistorialClinicoByCedula(idpacientes).subscribe(data=>{
        this.historialClinico=data;
        console.log(this.historialClinico.fichaDetalle);
      });
    }
    else{
      this.Router.navigate(['historialclinico']);
    }
   
  }
  Editar(id:any, contenido:any){
    this.esNuevo=false;
    this.titulo="Editar Consulta";
    this.api.FindFichaDetalleByID(id).subscribe(data=>{
      this.formViewModel.setValue({
        idfichadetalle:data.idfichadetalle,
        cedulapaciente:data.cedulapaciente,
        idespecialidad:data.idespecialidad,
        idmedico:data.idmedico,
        fechacracion:this.datepipe.transform((data.fechacracion), 'yyyy-MM-dd'),
        temperatura:data.temperatura,
        precion:data.precion,
        frecrespiratoria:data.frecrespiratoria,
        pulso:data.pulso,
        peso:data.peso,
        alcohol:data.alcohol,
        ejercicio:data.ejercicio,
        diagnostico:data.diagnostico,
        medicamento:data.medicamento,
        fuma:data.fuma,
        imc:data.imc,
        perimetrocintura:data.perimetrocintura,
        perimetrobranqual:data.perimetrobranqual,
        perimetropantorrilla:data.perimetropantorrilla,
        apetito:data.apetito,
        micccion:data.micccion,
        sed:data.sed,
        sueno:data.sueno,
        talla:data.talla,
        tratamiento:data.tratamiento,
      });
      console.log(this.formViewModel.value);
    });
    this.modal.open(contenido);
  }
  onsave(){
    if(this.esNuevo){
      console.log("Nuevo");
      this.api.AddFichaDetalle(this.formViewModel.value).subscribe(data=>{
        console.log(data);
      });
      this.modal.dismissAll();
      window.location.reload();
    }
    else
    {  
      console.log(this.formViewModel.value);
      this.api.EditFichaDetalle(this.formViewModel.value).subscribe(data=>{
        console.log(data);
      });
    }
  }
  Nuevo(contenido:any){
    this.titulo="Nueva Consulta";
    var usuario:UsuarioI=JSON.parse(this.cookieService.get('usuario'));
    this.formViewModel.setValue({
      idfichadetalle:0,
      cedulapaciente:usuario.cedula,
      idespecialidad:null,
      idmedico:null,
      fechacracion:this.datepipe.transform((new Date), 'yyyy-MM-dd'),
      temperatura:null,
      precion:null,
      frecrespiratoria:null,
      pulso:null,
      peso:null,
      alcohol:null,
      ejercicio:null,
      diagnostico:null,
      medicamento:null,
      fuma:null,
      imc:null,
      perimetrocintura:null,
      perimetrobranqual:null,
      perimetropantorrilla:null,
      apetito:null,
      micccion:null,
      sed:null,
      sueno:null,
      talla:null,
      tratamiento:null,
    });
    this.modal.open(contenido);
  }
}
