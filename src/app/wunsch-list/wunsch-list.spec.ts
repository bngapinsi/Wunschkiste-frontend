import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WunschList } from './wunsch-list';

describe('WunschList', () => {
  let component: WunschList;
  let fixture: ComponentFixture<WunschList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WunschList],
    }).compileComponents();

    fixture = TestBed.createComponent(WunschList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
