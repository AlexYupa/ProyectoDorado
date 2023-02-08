import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { PersonaComponent } from './vistas/persona/persona.component';
import { MasterPageComponent } from './vistas/master-page/master-page.component';
import { HomeComponent } from './vistas/home/home.component';
import { PacienteComponent } from './vistas/paciente/paciente.component';
import { MedicoComponent } from './vistas/medico/medico.component';
import { HistorialclinicoComponent } from './vistas/historialclinico/historialclinico.component';
import { FichadetalleComponent } from './vistas/fichadetalle/fichadetalle.component';
import { ConsultaComponent } from './vistas/consulta/consulta.component';
import { DetalleconsultaComponent } from './vistas/detalleconsulta/detalleconsulta.component';
import { UsuarioComponent } from './vistas/usuario/usuario.component';


const routes: Routes = [
  {path:'',redirectTo:'Index',pathMatch:'full'},
  {path:'Index', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'persona', component:PersonaComponent},
  {path:'masterpage', component:MasterPageComponent},
  {path:'paciente', component:PacienteComponent},
  {path:'medico', component:MedicoComponent},
  {path:'historialclinico', component:HistorialclinicoComponent},
  {path:'fichadetalle/:cedula', component:FichadetalleComponent},
  {path:'fichadetalle', component:FichadetalleComponent},
  {path:'consulta', component:ConsultaComponent},
  {path:'consulta/:id', component:DetalleconsultaComponent},
  {path:'usuario', component:UsuarioComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,PersonaComponent,MasterPageComponent,HomeComponent,PacienteComponent,MedicoComponent,HistorialclinicoComponent,FichadetalleComponent,ConsultaComponent,DetalleconsultaComponent,UsuarioComponent]
