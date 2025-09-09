import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByPrice } from './by-price';

describe('ByPrice', () => {
  let component: ByPrice;
  let fixture: ComponentFixture<ByPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByPrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
