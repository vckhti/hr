import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core'
import {DashboardModel} from "../../../../models/dashboardModel";
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('total') totalItemLengthProps: number;
  @Input('limit') limitProps: number;
  @Input('currentPage') currentPageProps: number;
  @Input() model: DashboardModel;
  urlProps: string = '/';

  @Output() newItemEvent = new EventEmitter<string>();

  pagesCount: number;
  pages: number[];
  visiblePages: number[];
  visibleRangeLength = 20;

  constructor( private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    if (this.totalItemLengthProps) {
      this.updateTotalPages();
      this.updateVisiblePages();
    }
  }

  private updateVisiblePages(): void {
    if (this.totalItemLengthProps && this.totalItemLengthProps > 0 && this.pagesCount) {
      const length = Math.min(this.pagesCount, this.visibleRangeLength) ?? 0;
      const startIndex = Math.max(
        Math.min(
          this.currentPageProps - Math.ceil(length / 2),
          this.pagesCount - length
        ),
        0
      );

      this.visiblePages = Array.from(
        new Array(length).keys(),
        (item) => item + startIndex
      );
    }
  }

  private updateTotalPages(): void {
    if (this.totalItemLengthProps) {
      this.pagesCount = Math.ceil(this.totalItemLengthProps / this.limitProps);
    }

  }

  public onClicked(v: number): void {
    this.updateVisiblePages();
    this.newItemEvent.emit(v.toString());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.totalItemLengthProps && this.totalItemLengthProps > 0 && this.pagesCount) {
      this.updateTotalPages();
      this.updateVisiblePages();
    }
  }
}
