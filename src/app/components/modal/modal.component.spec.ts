import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerServiceService } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/app/services/player-service/player-service.service';

import { ModalComponent } from './modal.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  "idPosition": 1,
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
  let playerService: PlayerServiceService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ModalComponent],
      providers: [
        { provide: PlayerServiceService, useValue: mockPlayerService },
        ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    playerService = TestBed.inject(PlayerServiceService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    mockPlayerService.postPlayer.mockImplementation(() => of(mockBody))
    mockPlayerService.editPlayerById.mockImplementation(() => of(mockBody))
    mockPlayerService.getPlayerById.mockImplementation(() => of(mockListOfPlayers))
    
    fixture.detectChanges();
  });
  afterEach(() => {
    if (fixture) {
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
  it('Should to call postPlayer in addPlayer method if the form is not undefined', () => {
    component.formPlayer.patchValue({
      firstName: mockBody.firstName,
      lastName : mockBody.lastName,
      image    : mockBody.image,
      attack   : mockBody.attack,
      defense  : mockBody.defense,          
      skills   : mockBody.skills,
      idPosition : mockBody.idPosition,
    })
    const bodyInAddPlayer ={
      ...component.formPlayer.getRawValue(),
      idAuthor: 27
    }
    component.addPlayer();
    expect(mockPlayerService.postPlayer).toHaveBeenCalled();
    expect(mockPlayerService.postPlayer).toHaveBeenCalledWith(bodyInAddPlayer);
  });
  it('should to call editPlayer in updatePlayer method', () => {

    component.updatePlayer();
    expect(mockPlayerService.editPlayerById).toHaveBeenCalled();
  });

});