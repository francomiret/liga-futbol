import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.scss'],
})
export class GoleadoresComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
const matModules = [];

@NgModule({
  declarations: [GoleadoresComponent],
  exports: [GoleadoresComponent],
  imports: [CommonModule],
})
export class GoleadoresModule {}
