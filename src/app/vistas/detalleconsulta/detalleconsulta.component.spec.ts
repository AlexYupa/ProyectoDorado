import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleconsultaComponent } from './detalleconsulta.component';

describe('DetalleconsultaComponent', () => {
  let component: DetalleconsultaComponent;
  let fixture: ComponentFixture<DetalleconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleconsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
