import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerServiceService } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/app/services/player-service/player-service.service';

import { CardPlayerComponent } from './card-player.component';

describe('CardPlayerComponent', () => {
  let component: CardPlayerComponent;
  let fixture: ComponentFixture<CardPlayerComponent>;
  const mockPlayerService = {
    deletePlayer: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPlayerComponent ],
      providers: [{provide: PlayerServiceService, useValue: mockPlayerService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
