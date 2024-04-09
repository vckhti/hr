import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TabComponent implements AfterContentInit {
	@Input() header?: string;
	@Input() active = false;

	@ContentChildren(TemplateRef) templates?: QueryList<TemplateRef<any>>;
	template?: TemplateRef<any>;

  constructor() { }

	ngAfterContentInit(): void {
		this.template = this.templates?.first ?? undefined;
	}

}
