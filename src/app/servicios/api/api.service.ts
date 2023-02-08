import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PersonaI } from 'src/app/modelos/persona.interfece';
import { Observable } from 'rxjs';
import { SexoI } from 'src/app/modelos/sexo.interface';
import { EstadoCivilI } from 'src/app/modelos/estadocivil.interface';
import { LoginI } from 'src/app/modelos/login.interface';
import { UsuarioViewModelI } from 'src/app/modelos/usurioviewmodel.interface';
import { PacienteI } from 'src/app/modelos/paciente.interface';
import { MedicoI } from 'src/app/modelos/medico.interface';
import { HistorialClinicoI } from 'src/app/modelos/historialclinico.interface';
import { FichaDetalle } from 'src/app/class/fichadetalle.class';
import { ConsultaI } from 'src/app/modelos/consulta.interface';
import { EspecialidadI } from 'src/app/modelos/especialidad.interface';
import { FichaDettalleI } from 'src/app/modelos/fichadetalle.interface';
import { Consulta } from 'src/app/class/consulta.class';
import { DetalleConsultaI } from 'src/app/modelos/detalleconsulta.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string="http://localhost:8082/";
  constructor(private http:HttpClient) { }
    //Login
    IniciarSesion(form:LoginI):Observable<UsuarioViewModelI>{    
      return this.http.post<UsuarioViewModelI>(this.url+'Usuario/Login',form);
     }
    //Usuario
    ListaUsuario():Observable<UsuarioI[]>{    
      return this.http.get<UsuarioI[]>( this.url+'Usuario/List');
    }
    AddUsuario(form:UsuarioI):Observable<UsuarioI>{    
      return this.http.post<UsuarioI>(this.url+'Usuario/Add',form);
    }
    EditUsuario(form:UsuarioI):Observable<UsuarioI>{    
      return this.http.put<UsuarioI>(this.url+'Usuario/Edit',form);
    }
    DeletUsuario(cedula:any):Observable<string>{    
      return  this.http.delete<string>(this.url+'Usuario/Delete/'+cedula);
    }
    //Persona
    ListaPersona():Observable<PersonaI[]>{    
      return this.http.get<PersonaI[]>( this.url+'Persona/List');
    }
    AddPersona(form:PersonaI):Observable<PersonaI>{    
      return this.http.post<PersonaI>(this.url+'Persona/Add',form);
    }
    FindPersonaByCedula(cedula:any):Observable<PersonaI>{    
      return this.http.get<PersonaI>( this.url+'Persona/FindById/'+cedula);
    }
    EditPersona(form:PersonaI):Observable<PersonaI>{    
      return this.http.put<PersonaI>(this.url+'Persona/Edit',form);
    }
    DeletPersona(cedula:any):Observable<string>{    
      return  this.http.delete<string>(this.url+'Persona/Delete/'+cedula);
    }
    //Sexo
    ListaSexo():Observable<SexoI[]>{    
      return this.http.get<SexoI[]>( this.url+'Sexo/List');
    }
    //Estado Civil
    ListaEstadoCivil():Observable<EstadoCivilI[]>{    
      return this.http.get<EstadoCivilI[]>( this.url+'EstadoCivil/List');
    }
      //Paciente
    ListaPaciente():Observable<PacienteI[]>{    
      return this.http.get<PacienteI[]>( this.url+'Paciente/List');
    }
    AddPaciente(form:PacienteI):Observable<PacienteI>{    
      return this.http.post<PacienteI>(this.url+'Paciente/Add',form);
    }
    FindPacienteByCedula(cedula:any):Observable<PacienteI>{    
      return this.http.get<PacienteI>( this.url+'Paciente/FindById/'+cedula);
    }
    EditPaciente(form:PacienteI):Observable<PacienteI>{    
      return this.http.put<PacienteI>(this.url+'Paciente/Edit',form);
    }
    DeletPaciente(cedula:any):Observable<string>{    
      return  this.http.delete<string>(this.url+'Paciente/Delete/'+cedula);
    }
     //Medico 
     ListaMedico():Observable<MedicoI[]>{    
      return this.http.get<MedicoI[]>( this.url+'Medico/List');
    }
    AddMedico(form:MedicoI):Observable<MedicoI>{    
      return this.http.post<MedicoI>(this.url+'Medico/Add',form);
    }
    FindMedicoByCedula(id:any):Observable<MedicoI>{    
      return this.http.get<MedicoI>( this.url+'Medico/FindById/'+id);
    }
    EditMedico(form:MedicoI):Observable<MedicoI>{    
      return this.http.put<MedicoI>(this.url+'Medico/Edit',form);
    }
    DeletMedico(id:any):Observable<string>{    
      return  this.http.delete<string>(this.url+'Medico/Delete/'+id);
    }
    //historial Clinico
    ListaHistorialClinico():Observable<HistorialClinicoI[]>{    
      return this.http.get<HistorialClinicoI[]>( this.url+'HistorialClinico/List');
    }
    AddHistorialClinico(form:HistorialClinicoI):Observable<HistorialClinicoI>{    
      return this.http.post<HistorialClinicoI>(this.url+'HistorialClinico/Add',form);
    }
    FindHistorialClinicoByCedula(cedula:any):Observable<HistorialClinicoI>{    
      return this.http.get<HistorialClinicoI>( this.url+'HistorialClinico/FindById/'+cedula);
    }
    EditHistorialClinico(form:HistorialClinicoI):Observable<HistorialClinicoI>{    
      return this.http.put<HistorialClinicoI>(this.url+'HistorialClinico/Edit',form);
    }
    DeletHistorialClinico(cedula:any):Observable<string>{    
      return  this.http.delete<string>(this.url+'HistorialClinico/Delete/'+cedula);
    }
    //Ficha Detalle
    AddFichaDetalle(form:FichaDetalle):Observable<FichaDetalle>{    
      return this.http.post<FichaDetalle>(this.url+'FichaDetalle/Add',form);
    }
    FindFichaDetalleByID(id:any):Observable<FichaDetalle>{    
      return this.http.get<FichaDetalle>( this.url+'FichaDetalle/FindById/'+id);
    }
    EditFichaDetalle(form:FichaDetalle):Observable<FichaDetalle>{    
      return this.http.put<FichaDetalle>(this.url+'FichaDetalle/Edit',form);
    }
    //Consultas
    ListaConsulta():Observable<ConsultaI[]>{    
      return this.http.get<ConsultaI[]>( this.url+'Consulta/List');
    }
    FindConsultaByID(id:any):Observable<Consulta>{    
      return this.http.get<Consulta>( this.url+'Consulta/FindById/'+id);
    }
    AddConsulta(form:ConsultaI):Observable<ConsultaI>{    
      return this.http.post<ConsultaI>(this.url+'Consulta/Add',form);
    }
    EditConsulta(form:ConsultaI):Observable<ConsultaI>{    
      return this.http.put<ConsultaI>(this.url+'Consulta/Edit',form);
    }
    DeletConsulta(id:any):Observable<string>{    
      return  this.http.delete<string>(this.url+'Consulta/Delete/'+id);
    }
    //Especialidad
    ListaEspecialidad():Observable<EspecialidadI[]>{    
      return this.http.get<EspecialidadI[]>( this.url+'Especialidad/List');
    }
     //DetalleConsultas
     ListaDetalleConsulta():Observable<DetalleConsultaI[]>{    
      return this.http.get<DetalleConsultaI[]>( this.url+'DetalleConsulta/List');
    }
    ListaDetalleConsultaByIdConsulta(id:any):Observable<DetalleConsultaI[]>{    
      return this.http.get<DetalleConsultaI[]>( this.url+'DetalleConsulta/ListFindByIdConsulta/'+id);
    }
    EditDetalleConsulta(form:DetalleConsultaI):Observable<DetalleConsultaI>{    
      return this.http.put<DetalleConsultaI>(this.url+'DetalleConsulta/Edit',form);
    }
}
