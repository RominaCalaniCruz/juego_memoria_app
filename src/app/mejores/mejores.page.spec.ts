import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MejoresPage } from './mejores.page';

describe('MejoresPage', () => {
  let component: MejoresPage;
  let fixture: ComponentFixture<MejoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MejoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
