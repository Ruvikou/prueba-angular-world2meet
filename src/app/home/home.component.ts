import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../models/hero.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpinnerComponent,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private heroesService = inject(HeroesService);
  public searchName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  public heroes: Hero[] = [];
  public heroesFiltered: Hero[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.heroes = this.heroesService.getHeroes();
    this.heroesFiltered = this.heroes;
  }

  public search() {
    if(this.searchName && this.searchName.valid) {
      this.heroesFiltered = this.heroes.filter( hero => {
        return hero.name.toLowerCase().includes(this.searchName.value.toLowerCase());
      });
      console.log(this.heroesFiltered)
    } else {
      this.heroesFiltered = this.heroes
    }
  }

  public deleteHero(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(id);
      }
    });
  }
}
