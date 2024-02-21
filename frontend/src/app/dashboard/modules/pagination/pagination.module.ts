import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilsService} from "./services/utils.service";
import {PaginationComponent} from "./components/pagination/pagination.component";

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsService]
})
export class PaginationModule {}
