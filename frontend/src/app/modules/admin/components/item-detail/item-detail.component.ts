import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  data: any = this.config.data ?? undefined;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  isArray(value?: any): boolean //TODO типизировать value
  {
   return Array.isArray(value);
  }

  isNumber(value?: any): boolean //TODO типизировать value
  {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  isObject(value?: any): boolean //TODO типизировать value
  {
    return value instanceof Object;
  }

}
