import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichadetalleComponent } from './fichadetalle.component';

describe('FichadetalleComponent', () => {
  let component: FichadetalleComponent;
  let fixture: ComponentFixture<FichadetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichadetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichadetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
