import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPuzzle } from './test-puzzle';

describe('TestPuzzle', () => {
  let component: TestPuzzle;
  let fixture: ComponentFixture<TestPuzzle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPuzzle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPuzzle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
