import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ContractSummaryComponent} from "./contract-summary.component";

describe('ContractSummaryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ContractSummaryComponent
      ],
    }).compileComponents();
  });

  it('should create the ContractSummaryComponent', () => {
    const fixture = TestBed.createComponent(ContractSummaryComponent);
    const contractSummaryComponent = fixture.componentInstance;
    expect(contractSummaryComponent).toBeDefined();
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(ContractSummaryComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('my1 app is running!');
  });
});
