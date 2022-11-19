import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { Player, Position } from 'src/app/interfaces/player-interface';
import { PlayerServiceService } from '/Users/USER/Desktop/laboratoria/angular-seniority-Q3/src/app/services/player-service/player-service.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  formPlayer!: FormGroup
  btnChange: string = 'Agregar al jugador';
  btnAction: string = 'Registrar';
  edit!: Player;
  positionList$: Observable<Position[]>;

  getId = this.activatedRoute.snapshot.paramMap.get('id');

  @Input()player$!: Observable<Player[]>;
 

  constructor(private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute,
    private playerService: PlayerServiceService ) {
    this.buildForm();
    this.positionList$= this.playerService.getPosition();
   
    }

 
  buildForm() {
    this.formPlayer = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName : [null, Validators.required],
      image    : [null, Validators.required],
      idPosition : [null, Validators.required],
      attack   : [0, Validators.required],
      defense  : [0, Validators.required],
      skills   : [0, Validators.required],
    });
    if (this.getId) {      
      this.playerService.getPlayerById(this.getId)
      .subscribe({
        next: player => {
         
          this.btnAction = 'Editar';
          this.btnChange = 'Edición de jugaor';
          console.log(this.edit, 'this edit')
          this.edit = player[0]
          this.formPlayer.patchValue({
            firstName: this.edit.firstName,
            lastName : this.edit.lastName,
            image    : this.edit.image,
            attack   : this.edit.attack,
            defense  : this.edit.defense,          
            skills   : this.edit.skills,
            idPosition : this.edit.idPosition,
         
        })
        }
      })  
    }
  }
  isValid(formControlName: string){
    return this.formPlayer.controls[formControlName].touched
     && this.formPlayer.controls[formControlName].errors

  }


  addPlayer(){
    const formValue = this.formPlayer.getRawValue();
    console.log(formValue, 'form')
    if (this.formPlayer.invalid) {
         this.formPlayer.markAllAsTouched()
          return;
       }
       if (!this.edit) {
            this.playerService.postPlayer({...formValue, idAuthor: 27})
              .subscribe({
                next: res => {
                  console.log(res, 'res de post')
                  alert('jugador creado exitosamente')      
                },
                error: error => {
                  alert('Ha ocurrido un error al añadir los datos')
                }
              })
            this.formPlayer.reset()
          } else {
            this.updatePlayer()
          }
  }
 
 
  updatePlayer() {
    this.playerService.editPlayerById(this.getId,{... this.formPlayer.getRawValue(), idAuthor: 27})
      .subscribe({
        next: res => {
          console.log(res, 'res update')
          alert('Libro actualizado correctamente');
          this.formPlayer.reset();
        },
        error: error => {
          alert(`${error} Error en la actualización de datos`)
        }

      })
  }


}