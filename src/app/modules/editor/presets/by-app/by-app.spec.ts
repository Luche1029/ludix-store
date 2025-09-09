import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByApp } from './by-app';

describe('ByApp', () => {
  let component: ByApp;
  let fixture: ComponentFixture<ByApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
