import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsuario } from './gestion-usuario';

describe('GestionUsuario', () => {
  let component: GestionUsuario;
  let fixture: ComponentFixture<GestionUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
