import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObjeto } from './editar-objeto';

describe('EditarObjeto', () => {
  let component: EditarObjeto;
  let fixture: ComponentFixture<EditarObjeto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarObjeto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarObjeto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
