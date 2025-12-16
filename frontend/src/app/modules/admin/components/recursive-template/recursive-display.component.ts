import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-nested-object-display',
  template: `
    <div *ngFor="let entry of data | keyvalue">
      <strong>{{ entry.key }}:</strong>
      <ng-container *ngIf="isObject(entry.value)  && !isArray(entry.value)">
        <app-nested-object-display [data]="entry.value"></app-nested-object-display>
      </ng-container>
      <ng-container *ngIf="isArray(entry.value)">
        <ul>
          <li *ngFor="let item of $any(entry.value)">
            <app-nested-object-display [data]="item"></app-nested-object-display>
          </li>
        </ul>
      </ng-container>
      <ng-container *ngIf="!isObject(entry.value)">
        <span>&nbsp;{{ entry.value }}</span>
      </ng-container>
    </div>
  `,
})
export class NestedObjectDisplayComponent {
  @Input() data: any;

  isArray(value?: any): boolean
  {
    return Array.isArray(value);
  }

  isObject(value?: any): boolean
  {
    return value instanceof Object;
  }

}
