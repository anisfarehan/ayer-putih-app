import {NgForm} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {GlobalService} from "../../providers/global-service";
import {ChannelData} from '../../providers/channel-data';

import {Platform} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
/*
 Generated class for the Akaun page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-akaun',
    templateUrl: 'akaun.html'
})
export class AkaunPage {
    username:any;
    user:{id?:number, studentName?:string, kelas?:string, nric?:string,
        motherName?:string, fathername?:string, agama?:string, warganegara?:string,alamat?:string} = {};

    constructor(public navCtrl:NavController, public userData:UserData, public globalService:GlobalService, public navParams:NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AkaunPage');
        this.user.id = 1;
        this.user.studentName = "Ali Baba";
        this.user.kelas = "Bijak";
        this.user.nric = "943591845581";
        this.user.motherName = "Minah Rempit";
        this.user.fathername = "Mat Rempit";
        this.user.agama = "Kafir";
        this.user.warganegara = "Najib";
        this.user.alamat = "No.23 Jln Mati";
    }

    onUpdate() {
        let loading = this.globalService.loading("Processing");
        loading.present();

        this.userData.profileUpdate(this.user).subscribe((data:any)=> {
            this.globalService.toast("Profile updated!").present();
            this.userData.refreshUserData().subscribe((data:any)=> {

            });
        }, (error:any)=> {
            console.log(error);
            this.globalService.toast("Opss! Something went wrong.").present();
        });

        loading.dismiss();
    }

}
