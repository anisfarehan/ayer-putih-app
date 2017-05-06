import { Component } from '@angular/core';

import {UserData} from "../../providers/user-data";
import {NavController, NavParams} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:any;
  user:{id?:number, studentName?:string, kelas?:string, nric?:string,
    motherName?:string, fathername?:string, agama?:string, warganegara?:string,alamat?:string} = {};

  constructor(public navCtrl: NavController,public userData:UserData,public globalService:GlobalService,public navParams:NavParams, public auth:Auth) {

    userData.getNRIC().then((data:any)=> {
      this.user.nric = data;

      userData.getPelajar(this.user.nric).subscribe((data:any)=> {
        console.log(data);
        this.user.studentName = data.pelajarnama;
        this.user.kelas = data.kelas_id;
      });
    });
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}