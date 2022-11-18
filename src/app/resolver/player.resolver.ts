import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs";

import { Player } from '../interfaces/player-interface';
import { PlayerServiceService } from '../services/player-service/player-service.service';

@Injectable({
  providedIn: 'root'
})

export class PlayerResolver implements Resolve<Player[]>{

  constructor( private playerService: PlayerServiceService, route: Router) { }

  resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player[]> | Promise<Player[]> | Player []=>
  {
       return this.playerService.getPlayerById(route.paramMap.get('id'))  

  };

}