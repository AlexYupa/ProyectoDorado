import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Consulta } from 'src/app/class/consulta.class';
import { ConsultaI } from 'src/app/modelos/consulta.interface';
import { DetalleConsultaI } from 'src/app/modelos/detalleconsulta.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-detalleconsulta',
  templateUrl: './detalleconsulta.component.html',
  styleUrls: ['./detalleconsulta.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetalleconsultaComponent implements OnInit {
  consulta:Consulta= new Consulta();
  listItem:DetalleConsultaI[]=[];
  titulo:string='';
  formViewModel=new FormGroup(
    {
      idconsulta: new FormControl(0),
      iddatomedico:new FormControl(0),
      valor:new FormControl('',Validators.required),
      nota:new FormControl('')
    });
  constructor(private api:ApiService, private Router:Router, private cookieService: CookieService,public modal:NgbModal,private formBuilder: FormBuilder,public datepipe: DatePipe, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    var idconsulta:string|null=this.activatedRoute.snapshot.paramMap.get('id');
    this.api.FindConsultaByID(idconsulta).subscribe(data=>{
     this.consulta=data;
     this.api.ListaDetalleConsultaByIdConsulta(this.consulta.idconsulta).subscribe(data=>{
      this.listItem=data;
      console.log(this.listItem);
    });
    });
    
   
  }
  Editar(idconsulta:any, iddatomedico:any, contenido:any){
      //alert(idconsulta +' '+iddatomedico);
      
      var detalle= this.listItem.find(x=>x.idconsulta==idconsulta && x.iddatomedico==iddatomedico);
      this.titulo= ''+detalle?.datoMedico.detalle;
      this.formViewModel.setValue({
        idconsulta:detalle?.idconsulta,
      iddatomedico:detalle?.iddatomedico,
      valor:detalle?.valor,
      nota:detalle?.nota
      });
      this.modal.open(contenido);
  }
  detalle(idconsulta:any, iddatomedico:any){

  }
  eliminar(idconsulta:any, iddatomedico:any){

  }
  onsave(){
    console.log(this.formViewModel.value);
    this.api.EditDetalleConsulta(this.formViewModel.value).subscribe();
    window.location.reload();

  }

}
