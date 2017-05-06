import {NgForm} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {GlobalService} from "../../providers/global-service";
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
        userData.getNRIC().then((data:any)=> {
            this.user.nric = data;

            userData.getPelajar(this.user.nric).subscribe((data:any)=> {
                console.log(data);
                this.user.studentName = data.pelajarnama;
                this.user.kelas = data.kelas_id;
                this.user.motherName = data.namaibu;
                this.user.fathername = data.namabapa;
                this.user.agama = data.agama;
                this.user.warganegara = data.warganegara;
                this.user.alamat = data.alamat;
            });
        });
    }

    ionViewDidLoad() {

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
