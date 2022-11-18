import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/interfaces/player-interface';
import { PlayerServiceService } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/app/services/player-service/player-service.service';


@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent  {
  @Input()
  player$!: Observable<Player[]>;

  deletePlayer(player: Player){
    this.playerService.deletePlayerById(player.id)
    .subscribe({
      next: ()=>{
        alert('Usuario eliminado exitosamente')
      }
    })

  }

  constructor( private playerService: PlayerServiceService) {
   }

 
}
