import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { equipos } from 'src/models/test-data';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubesComponent {
  public clubes = equipos;
  public clubClicked(nombre: string) {}
}

const materialModules = [MatCardModule];

@NgModule({
  declarations: [ClubesComponent],
  exports: [ClubesComponent],
  imports: [CommonModule, materialModules],
})
export class ClubModule {}
