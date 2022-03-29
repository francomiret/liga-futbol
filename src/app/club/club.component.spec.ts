import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubesComponent } from './club.component';

describe('ClubesComponent', () => {
  let component: ClubesComponent;
  let fixture: ComponentFixture<ClubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
