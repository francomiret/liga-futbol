import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
const matModules = [];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule],
})
export class TarjetasModule {}
