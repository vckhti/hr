import {CanDeactivate} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {Injectable} from "@angular/core";
import {DashboardComponent} from "../components/dashboard/dashboard.component";

@Injectable()
export class DashboardCanDeactivateService implements CanDeactivate<DashboardComponent>{
  constructor(
    private dashboardService: DashboardService
  ) {
  }

  canDeactivate(component: DashboardComponent)  {
    if (!this.dashboardService.getTestFinished()) {
      return window.confirm("Завершить тестирование и выйти без сохранения результата?");
    } else {
      return true;
    }
  }
}
