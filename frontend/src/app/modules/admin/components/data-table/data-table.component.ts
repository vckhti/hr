import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Table } from 'primeng/table';
import {TableColumn} from "../../interfaces/table-column";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<ItemType> {

	@Input() items: ItemType[] = [];
  @Input() usersDescriptions: any[] = [];
	@Input() columns: TableColumn[] = [];
	@Input() selectedItem?: ItemType;
	@Input() loading = false;
	@Input() showFilters = true;
  @Input() showHotspot = true;
  @Input() customProjectFilter = false;
  @Input() perPage: number = 100;
  @Input() paginationEnable = false;
	@ViewChild('table') table?: Table;
	@Output() selectedItemChange = new EventEmitter<ItemType|undefined>();
  @Output() onItemClick  = new EventEmitter<ItemType|undefined>();

  constructor(private cdr: ChangeDetectorRef) { }

	onRowSelect(): void {
		this.selectedItemChange.emit(this.selectedItem);
	}

  onRowClick(): void {
    this.onItemClick.emit(this.selectedItem);
  }

	onRowUnselect($event: any): void {
		const element = $event.data as ItemType;

		this.selectedItem = element;

		if (this.table !== undefined) {
			this.table.selection = element;
			this.cdr.detectChanges();
		}

		this.selectedItemChange.emit(this.selectedItem);
	}

  getOrgNameByOrgId(orgId: number): string {
    switch (orgId) {
      case 1: return 'РТКомм Дальний Восток'
      default:
        return orgId.toString();
    }
  }

  toInt(str: string): any {
    return str && str.length > 0 ? parseInt(str) : ''
  }

}
