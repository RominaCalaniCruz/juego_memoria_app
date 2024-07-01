import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModoFacilPage } from './modo-facil.page';

describe('ModoFacilPage', () => {
  let component: ModoFacilPage;
  let fixture: ComponentFixture<ModoFacilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoFacilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
