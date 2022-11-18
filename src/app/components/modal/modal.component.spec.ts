import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerServiceService } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/app/services/player-service/player-service.service';

import { ModalComponent } from './modal.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Position } from 'src/app/interfaces/player-interface';

const mockResponsePositionBody: Position[] = [
  {
    id: 1,
    description: 'Delantero'
  },
  {
    id: 2,
    description: 'Media Punta'
  },
  {
    id: 3,
    description: 'Volante mixto'
  },
]
const mockListOfPlayers = [
  {
    "firstName": "string",
    "lastName": "string",
    "image": "string",
    "attack": 0,
    "defense": 0,
    "skills": 0,
    "idAuthor": 0,
    "idPosition": 0,
    "id": 101
  },
  {
    "firstName": "string",
    "lastName": "string",
    "image": "string",
    "attack": 0,
    "defense": 0,
    "skills": 0,
    "idAuthor": 0,
    "idPosition": 0,
    "id": 102
  }
]
const mockBody = {
  "firstName": "string",
  "lastName": "string",
  "image": "string",
  "attack": 0,
  "defense": 0,
  "skills": 0,
  "idAuthor": 0,
  "idPosition": 0,
  "id": 101
}

const mockPlayerService = {
  getPlayerById: jest.fn(),
  postPlayer: jest.fn(),
  editPlayerById: jest.fn(),
  getPosition: jest.fn().mockImplementation(() => of(mockResponsePositionBody))

}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, ],
      declarations: [ModalComponent],
      providers: [{ provide: PlayerServiceService, useValue: mockPlayerService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    mockPlayerService.postPlayer.mockImplementation(()=>of (mockBody));
    mockPlayerService.editPlayerById.mockImplementation(()=>of(mockBody))
    fixture.detectChanges();
  });
  afterEach(()=>{
    if(fixture){
      fixture.destroy();
    }
    mockPlayerService.postPlayer.mockClear();
    mockPlayerService.postPlayer.mockReset();
    mockPlayerService.editPlayerById.mockReset();
    mockPlayerService.editPlayerById.mockClear();
    mockPlayerService.getPlayerById.mockReset();
    mockPlayerService.getPlayerById.mockClear();

  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('', () => {
    mockPlayerService.postPlayer.mockImplementation(()=>of (mockBody))
    component.addPlayer();
    expect(mockPlayerService.postPlayer).toHaveBeenCalled();
  });
  it('', () => {
    mockPlayerService.editPlayerById.mockImplementation(()=>of (mockBody))
    component.updatePlayer();
    expect(mockPlayerService.editPlayerById).toHaveBeenCalled();
  });
  it('', () => {
    mockPlayerService.getPlayerById.mockImplementation(()=>of (mockListOfPlayers))
    component.buildForm();
    expect(mockPlayerService.getPlayerById).toHaveBeenCalled();
  });
});