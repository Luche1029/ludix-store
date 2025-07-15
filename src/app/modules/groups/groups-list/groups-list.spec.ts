import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupsList } from './groups-list';

describe('GroupsList', () => {
  let component: GroupsList;
  let fixture: ComponentFixture<GroupsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsList]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render group names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul')?.textContent).toContain('Gruppo A');
    expect(compiled.querySelector('ul')?.textContent).toContain('Gruppo B');
  });
});
