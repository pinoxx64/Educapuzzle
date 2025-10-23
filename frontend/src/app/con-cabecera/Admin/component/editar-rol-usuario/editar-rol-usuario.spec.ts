import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRolUsuario } from './editar-rol-usuario';

describe('EditarRolUsuario', () => {
  let component: EditarRolUsuario;
  let fixture: ComponentFixture<EditarRolUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRolUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRolUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
