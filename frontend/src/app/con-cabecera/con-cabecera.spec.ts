import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConCabecera } from './con-cabecera';

describe('ConCabecera', () => {
  let component: ConCabecera;
  let fixture: ComponentFixture<ConCabecera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConCabecera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConCabecera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
