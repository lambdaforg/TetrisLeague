import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBoardComponent } from './simple-board.component';

describe('SimpleBoardComponent', () => {
  let component: SimpleBoardComponent;
  let fixture: ComponentFixture<SimpleBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
