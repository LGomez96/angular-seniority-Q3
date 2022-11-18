import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { PlayerServiceService } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/app/services/player-service/player-service.service';
import { Player } from '../../interfaces/player-interface';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy {
  search:FormControl = new FormControl();

  subItems$: BehaviorSubject<string> = new BehaviorSubject('');
  player$: Observable<Player[]> = this.subItems$.asObservable()
  .pipe(
    switchMap((value)=>{
      return this.playerService.searchPlayerByAuthor({search:value})
    })
  )
 

  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private playerService: PlayerServiceService) {
    this.observerChangePublicSearch();
   }
  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }
 

  
  observerChangePublicSearch() {
    this.search.valueChanges
      .pipe(
        map((v:string)=>v.toLocaleLowerCase()),
        debounceTime(500),
        takeUntil(this.destroy$)
      ).subscribe(value => this.subItems$.next(value ))
  }
  
}
