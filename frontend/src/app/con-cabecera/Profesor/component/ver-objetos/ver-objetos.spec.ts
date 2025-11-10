import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerObjetos } from './ver-objetos';

describe('VerObjetos', () => {
  let component: VerObjetos;
  let fixture: ComponentFixture<VerObjetos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerObjetos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerObjetos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
