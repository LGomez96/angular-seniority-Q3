import { Injectable } from '@angular/core';
import { environment } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Player, Position, SearchPlayerDto } from 'src/app/interfaces/player-interface';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {
  private apiUrl = environment.apiUrl + 'player';
  private apiUrlPosition = environment.apiUrl + 'position';


  private headerOptions = {
    " Content-Type": "application/json",
     "Accept": "application/json",
      "author":"27"
  }
  header: HttpHeaders= new HttpHeaders(this.headerOptions)

  constructor(private http: HttpClient   ) { }
  getPlayer(): Observable<Player[]>{
    return this.http.get<Player[]>(this.apiUrl, {headers: this.header})
  }

  
  postPlayer(body: Player): Observable<Player>{
    return this.http.post<Player>(this.apiUrl, body)
  }
  getPlayerById(id: any): Observable<Player[]> {
      return this.http.get<Player[]>(`${this.apiUrl}/${id}`)
  }
  
  editPlayerById(id: any, body:Player): Observable<Player>{
    return this.http.patch<Player>(`${this.apiUrl}/${id}`, body)
  }
  deletePlayerById(id: any): Observable<Player>{
    return this.http.delete<Player>(`${this.apiUrl}/${id}`)
  }
  searchPlayerByAuthor(body: SearchPlayerDto): Observable<Player[]>{
    return this.http.post<Player[]>(`${this.apiUrl}/search`, body, {headers:this.header})
  }


  getPosition(): Observable<Position[]>{
    return this.http.get<Position[]>(this.apiUrlPosition)
  }

  getPositionById(id: any): Observable<Position>{
    return this.http.get<Position>(`${this.apiUrlPosition}/${id}`)
  }
 
}
