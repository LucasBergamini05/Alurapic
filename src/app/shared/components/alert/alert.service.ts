import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Alert, AlertType } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService{

  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterRouteChange = false;

  constructor(router: Router){
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(this.keepAfterRouteChange) return this.keepAfterRouteChange = false;
        this.clear();
      }
    })
  }

  success(message: string, keepAfterRouteChange = false){
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange = false){
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }

  danger(message: string, keepAfterRouteChange = false){
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false){
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean){
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert(){
    return this.alertSubject.asObservable();
  }

  clear(){
    this.alertSubject.next();
  }
}
