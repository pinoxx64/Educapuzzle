import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCaracteristicas } from './ver-caracteristicas';

describe('VerCaracteristicas', () => {
  let component: VerCaracteristicas;
  let fixture: ComponentFixture<VerCaracteristicas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCaracteristicas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCaracteristicas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
