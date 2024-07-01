import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModoMedioPage } from './modo-medio.page';

describe('ModoMedioPage', () => {
  let component: ModoMedioPage;
  let fixture: ComponentFixture<ModoMedioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoMedioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
