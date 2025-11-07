import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetionPuzzle } from './getion-puzzle';

describe('GetionPuzzle', () => {
  let component: GetionPuzzle;
  let fixture: ComponentFixture<GetionPuzzle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetionPuzzle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetionPuzzle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
