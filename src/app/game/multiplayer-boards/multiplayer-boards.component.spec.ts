import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerBoardsComponent } from './multiplayer-boards.component';

describe('MyltiplayerBoardsComponent', () => {
  let component: MultiplayerBoardsComponent;
  let fixture: ComponentFixture<MultiplayerBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplayerBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
