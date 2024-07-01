import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModoDificilPage } from './modo-dificil.page';

describe('ModoDificilPage', () => {
  let component: ModoDificilPage;
  let fixture: ComponentFixture<ModoDificilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoDificilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
