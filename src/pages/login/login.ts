import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {Auth, User, UserDetails, IDetailedError} from '@ionic/cloud-angular';
import {HomePage} from '../home/home';
import {AuthService} from '../../providers/auth-service';
import {GlobalService} from '../../providers/global-service';
import {UserData} from "../../providers/user-data";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    showLogin:boolean = true;
    number_ic:string = '';
    password:string = '';
    name:string = '';

    constructor(public globalService:GlobalService, public userData:UserData, public navCtrl:NavController, public auth:AuthService, public user:User, public alertCtrl:AlertController, public loadingCtrl:LoadingController) {
        this.number_ic = "930317035924";
        this.password = "930317035924";
    }

    ionViewDidLoad() {
        console.log('Hello LoginPage Page');
    }

    /*
     for both of these, if the right form is showing, process the form,
     otherwise show it
     */
    doLogin() {
        if (this.showLogin) {
            console.log('process login');

            if (this.number_ic === '' || this.password === '') {
                let alert = this.alertCtrl.create({
                    title: 'Register Error',
                    subTitle: 'All fields are rquired',
                    buttons: ['OK']
                });
                alert.present();
                return;
            }

            let loader = this.loadingCtrl.create({
                content: "Sedang Prosess..."
            });
            loader.present();

            this.auth.login({'number_ic': this.number_ic, 'password': this.password}).subscribe((isValid:any) => {
                console.log(isValid);
                if (isValid) {
                    this.userData.getUserData().then((data:any)=> {
                        console.log(data);
                        this.globalService.alert("Berjaya", "Selamat Datang " + data.number_ic + "!").present();
                        this.navCtrl.setRoot(HomePage);
                    });
                } else {
                    this.globalService.alert("Gagal", "Salah Kad Pengenalan/kata laluan!").present();
                }
                loader.dismissAll();
            }, (err:any) => {
                loader.dismissAll();
                console.log(err.message);

                let errors = '';
                if (err.message === 'UNPROCESSABLE ENTITY') errors += 'Nombor kad pengenalan salah.<br/>';
                if (err.message === 'UNAUTHORIZED') errors += 'Kata Laluan tidak tepat.<br/>';

                let alert = this.alertCtrl.create({
                    title: 'Login Error',
                    subTitle: errors,
                    buttons: ['OK']
                });
                alert.present();
            });
        } else {
            this.showLogin = true;
        }
    }

    doRegister() {
        /* if(!this.showLogin) {
         console.log('process register');

         /!*
         do our own initial validation
         *!/
         if(this.name === '' || this.number_ic === '' || this.password === '') {
         let alert = this.alertCtrl.create({
         title:'Register Error',
         subTitle:'All fields are rquired',
         buttons:['OK']
         });
         alert.present();
         return;
         }

         let details: UserDetails = {'number_ic':this.number_ic, 'password':this.password, 'name':this.name};
         console.log(details);

         let loader = this.loadingCtrl.create({
         content: "Registering your account..."
         });
         loader.present();

         this.auth.signup(details).then(() => {
         console.log('ok signup');
         this.auth.login('basic', {'number_ic':details.number_ic, 'password':details.password}).then(() => {
         loader.dismissAll();
         this.navCtrl.setRoot(HomePage);
         });

         }, (err:IDetailedError<string[]>) => {
         loader.dismissAll();
         let errors = '';
         for(let e of err.details) {
         console.log(e);
         if(e === 'required_email') errors += 'Email is required.<br/>';
         if(e === 'required_password') errors += 'Password is required.<br/>';
         if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
         //don't need to worry about conflict_username
         if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
         }
         let alert = this.alertCtrl.create({
         title:'Register Error',
         subTitle:errors,
         buttons:['OK']
         });
         alert.present();
         });

         } else {
         this.showLogin = false;
         }*/
    }


}
