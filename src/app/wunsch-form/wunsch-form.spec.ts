import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WunschForm } from './wunsch-form';

describe('WunschForm', () => {
  let component: WunschForm;
  let fixture: ComponentFixture<WunschForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WunschForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WunschForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
