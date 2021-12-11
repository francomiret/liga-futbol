import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubesComponent } from './clubes.component';

@NgModule({
  declarations: [ClubesComponent],
  exports: [ClubesComponent],
  imports: [CommonModule],
})
export class ClubesModule {}
