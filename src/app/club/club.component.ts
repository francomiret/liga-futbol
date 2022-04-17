import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { Equipo } from 'src/models/torneo';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubesComponent {
  @Input()
  public clubes: Equipo[] = [];
  public panelOpenState = false;
  public displayedColumns = ['jugador', 'goles', 'ta', 'tr'];
}

const materialModules = [
  MatCardModule,
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
];

@NgModule({
  declarations: [ClubesComponent],
  exports: [ClubesComponent],
  imports: [CommonModule, materialModules],
})
export class ClubModule {}
