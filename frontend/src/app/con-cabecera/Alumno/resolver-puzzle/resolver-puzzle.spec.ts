import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolverPuzzle } from './resolver-puzzle';

describe('ResolverPuzzle', () => {
  let component: ResolverPuzzle;
  let fixture: ComponentFixture<ResolverPuzzle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolverPuzzle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolverPuzzle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
