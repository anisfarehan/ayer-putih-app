import {Injectable} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import {LoadingController, AlertController, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
  datePipeMy:DatePipe = new DatePipe('en-US');
  backend:any = {
    protocol: "http://",
    baseUrl: "8024d8f4.ngrok.io/Psm", //mexists:8238Gt@walm.cryptical.tech

    loginServletUrl: "/LoginServlet",
    getCurrentUserUrl: '/json/getCurrentUser',
    profileUpdateUrl: '/AppakaunServlet', //url utk update profileupdate amik dri user data ts. utk trik dri json
    profileServletUrl: '/ProfileServlet',
    pretasiServletUrl: '/AppviewresultServlet',
    updateGcmIdServletUrl: '/GCMSaveServlet',
  };

  constructor(public storage:Storage, public http:Http, private alertCtrl:AlertController,
              public toastCtrl:ToastController, public loadingCtrl:LoadingController) {
    this.backend.baseUrl = this.backend.protocol + this.backend.baseUrl;
    this.backend.loginServletUrl = this.backend.baseUrl + this.backend.loginServletUrl;
    this.backend.getCurrentUserUrl = this.backend.baseUrl + this.backend.getCurrentUserUrl;
    this.backend.profileUpdateUrl = this.backend.baseUrl + this.backend.profileUpdateUrl;
    this.backend.profileServletUrl = this.backend.baseUrl + this.backend.profileServletUrl;
    this.backend.pretasiServletUrl = this.backend.baseUrl + this.backend.pretasiServletUrl;
    this.backend.updateGcmIdServletUrl = this.backend.baseUrl + this.backend.updateGcmIdServletUrl;
  }

  getStorage(key:string) {
    return this.storage.get(key);
  }

  setStorage(key:string, data:any) {
    this.storage.set(key, data);
  }

  toast(message:string, duration:number = 4000, position:string = 'bottom', showCloseButton:boolean = true, closeButtonText:string = 'Ok') {
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText
    });
  }

  loading(content:string) {
    return this.loadingCtrl.create({
      content: content,
      // duration: duration,
      dismissOnPageChange: true
    });
  }

  alert(title:string, subTitle:string, buttons:any = ['Ok']) {
    return this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
  }

  getDateFromFormat(format:string = 'd MMM y', date:Date = new Date()):string {
    return this.datePipeMy.transform(date, format);
  }

  getLocalISOTimeString():string {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString();
  }

  getLocalISOTime():Date {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset));
  }

  getLocalISOTimeNext(ymdhis:string, period:number = 1):Date {
    var time = new Date();

    switch (ymdhis.toUpperCase().trim()) {
      default:
      case 'Y'://year
        time = new Date(new Date(this.getLocalISOTime())
          .setFullYear(this.getLocalISOTime()
              .getFullYear() + period));
        break;
      case 'M'://month
        time = new Date(new Date(this.getLocalISOTime())
          .setMonth(this.getLocalISOTime()
              .getMonth() + period));
        break;
      case 'D'://day
        time = new Date(new Date(this.getLocalISOTime())
          .setDate(this.getLocalISOTime()
              .getDate() + period));
        break;
      case 'H'://hour
        time = new Date(new Date(this.getLocalISOTime())
          .setHours(this.getLocalISOTime()
              .getHours() + period));
        break;
      case 'I'://minutes
        time = new Date(new Date(this.getLocalISOTime())
          .setMinutes(this.getLocalISOTime()
              .getMinutes() + period));
        break;
      case 'S'://second
        time = new Date(new Date(this.getLocalISOTime())
          .setSeconds(this.getLocalISOTime()
              .getSeconds() + period));
        break;
    }

    return time;
  }

  shuffle(sourceArray:any) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }

}
