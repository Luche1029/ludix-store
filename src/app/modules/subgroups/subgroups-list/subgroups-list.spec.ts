import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubgroupsList } from './subgroups-list';

describe('SubgroupsList', () => {
  let component: SubgroupsList;
  let fixture: ComponentFixture<SubgroupsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubgroupsList]
    }).compileComponents();

    fixture = TestBed.createComponent(SubgroupsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render subgroup names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul')?.textContent).toContain('Sub A');
    expect(compiled.querySelector('ul')?.textContent).toContain('Sub B');
  });
});
