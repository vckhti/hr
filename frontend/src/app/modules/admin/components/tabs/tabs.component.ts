import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit {

	@ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;

  constructor(private cdr: ChangeDetectorRef) { }

	ngAfterContentInit(): void {
		const firstTab = this.tabs?.first;
		if (firstTab !== undefined) {
			firstTab.active = true;
		}
    this.cdr.detectChanges();
	}

	getTabsArray(): TabComponent[] {
		return this.tabs?.toArray() ?? [];
	}

	selectTab(tab: TabComponent): void {
		this.getTabsArray().forEach(t => {
			t.active = t === tab;
		});
	}

}
