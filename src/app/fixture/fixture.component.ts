import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
const matModules = [];

@NgModule({
  declarations: [FixtureComponent],
  exports: [FixtureComponent],
  imports: [CommonModule],
})
export class FixtureModule {}
