import { TestBed } from '@angular/core/testing';
import { environment } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { PlayerServiceService } from './player-service.service';
import { Position } from 'src/app/interfaces/player-interface';
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

const mockPositionId = {
  id: 1,
  description: 'Delantero'
}
describe('PlayerServiceService', () => {
  let service: PlayerServiceService;
  let httpController: HttpTestingController;
  let apiUrl = environment.apiUrl + 'player';
  let apiUrlPosition = environment.apiUrl + 'position';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerServiceService]
    });
    service = TestBed.inject(PlayerServiceService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should receive a list of players', (doneFn) => {
    service.getPlayer()
      .subscribe(data => {
        expect(data).toEqual(mockListOfPlayers);
        doneFn();
      })


    const url = apiUrl;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockListOfPlayers);
  });
  it('should return a new player', (doneFn) => {

    service.postPlayer(mockBody)
      .subscribe(data => {
        // Assert
        expect(data).toEqual(mockBody);
        doneFn();
      });

    // http config
    const url = apiUrl;
    const req = httpController.expectOne(url);
    req.flush(mockBody);
    expect(req.request.body).toEqual(mockBody);
    expect(req.request.method).toEqual('POST');
  });
  it('should receive a players by ID', (doneFn) => {
    service.getPlayerById(mockBody.id)
      .subscribe(data => {
        expect(data).toEqual(mockListOfPlayers);
        doneFn();
      })

    const id = 101
    const url = `${apiUrl}/${id}`;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockListOfPlayers);
  });

  it('should return a update player', (doneFn) => {

    service.editPlayerById(mockBody.id, mockBody)
      .subscribe(data => {
        // Assert
        expect(data).toEqual(mockBody);
        doneFn();
      });

    const id = 101
    const url = `${apiUrl}/${id}`;
    const req = httpController.expectOne(url);
    req.flush(mockBody);
    expect(req.request.body).toEqual(mockBody);
    expect(req.request.method).toEqual('PATCH');
  });


  it('should delete a player', (doneFn) => {

    service.deletePlayerById(mockBody.id)
      .subscribe(data => {
        // Assert
        expect(data).toEqual(mockBody);
        doneFn();
      });

    const id = 101
    const url = `${apiUrl}/${id}`;
    const req = httpController.expectOne(url);
    req.flush(mockBody);
    expect(req.request.method).toEqual('DELETE');
  });
  it('should receive a list of positions in the play', (doneFn) => {

    service.getPosition()
      .subscribe(data => {
        expect(data).toEqual(mockResponsePositionBody);
        doneFn();
      })

    const url = apiUrlPosition
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponsePositionBody);

  });

  it('should receive a list of positions in the play by ID', (doneFn) => {

    const id = 1;
    service.getPositionById(id)
      .subscribe(data => {
        expect(data).toEqual(mockPositionId);
        doneFn();
      })

    const url = `${apiUrlPosition}/${id}`;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPositionId);
  });
  it('should return a new player', (doneFn) => {
    service.searchPlayerByAuthor({ search: mockBody.firstName })
      .subscribe(data => {
        // Assert
        expect(data).toEqual(mockListOfPlayers);
        doneFn();
      });

    // http config

    const url = `${apiUrl}/search`;
    const req = httpController.expectOne(url);
    req.flush(mockListOfPlayers);
    expect(req.request.body).toEqual({ search: mockBody.firstName });
    expect(req.request.method).toEqual('POST');
  });
});




