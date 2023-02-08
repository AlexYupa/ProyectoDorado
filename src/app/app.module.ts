import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterhistorialPipe } from './vistas/historialclinico/pipes/filterhistorial.pipe';
import { DatePipe } from '@angular/common';
import { FilterpersonaPipe } from './vistas/persona/pipes/filterpersona.pipe';
import { FillPacienteByCedulaPipe } from './vistas/paciente/pipes/fill-paciente-by-cedula.pipe';
import { FilterconsultaPipe } from './vistas/consulta/buscar/filterconsulta.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';





@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    FilterhistorialPipe,
    FilterpersonaPipe,
    FillPacienteByCedulaPipe,
    FilterconsultaPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [
    DatePipe 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
