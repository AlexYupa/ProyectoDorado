import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialclinicoComponent } from './historialclinico.component';

describe('HistorialclinicoComponent', () => {
  let component: HistorialclinicoComponent;
  let fixture: ComponentFixture<HistorialclinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialclinicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialclinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
