import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObjeto } from './crear-objeto';

describe('CrearObjeto', () => {
  let component: CrearObjeto;
  let fixture: ComponentFixture<CrearObjeto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearObjeto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearObjeto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
