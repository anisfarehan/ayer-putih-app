import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {GlobalService} from "../../providers/global-service";
import { Auth, User } from '@ionic/cloud-angular';
import {LoginPage} from "../login/login";

/*
  Generated class for the Aktivit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aktivit',
  templateUrl: 'aktivit.html'
})
export class AktivitPage {
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
