import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from './global-service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserData {
    _favorites:string[] = [];
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    REMEMBER_ME = 'rememberMe';
    USER_DATA = 'userData';
    BACKEND_LOGIN_FIELD = 'primary_phone';
    BACKEND_PASSWORD_FIELD = 'password';

    constructor(public events:Events,
                public storage:Storage,
                public http:Http,
                public globalService:GlobalService) {
    }

    hasFavorite(sessionName:string) {
        return (this._favorites.indexOf(sessionName) > -1);
    };

    addFavorite(sessionName:string) {
        this._favorites.push(sessionName);
    };

    removeFavorite(sessionName:string) {
        let index = this._favorites.indexOf(sessionName);
        if (index > -1) {
            this._favorites.splice(index, 1);
        }
    };

    setLoginInfo(user_id:string, number_ic:string) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set(this.REMEMBER_ME, true);
        this.setUserID(user_id);
        this.setNumberIC(number_ic);
        this.events.publish('user:login');
    };

    setUserID(user_id:string) {
        this.storage.set('user_id', user_id);
    }

    setNumberIC(number_ic:string) {
        this.storage.set('number_ic', number_ic);
    }

    refreshUserData() {
        return Observable.create((observer:any) => {
            // At this point make a request to your backend to make a real check!
            var postData = ({
                csrf_token: '',
            });

            this.http.post(this.globalService.backend.getCurrentUserUrl, postData)
                .subscribe((responseData:any) => {
                    var userData = responseData.json().user;

                    //set the current user data from backend
                    this.setUserData(userData);
                    this.events.publish('user:refresh');

                    observer.next(true);
                    observer.complete();

                }, (error:any) => {
                    console.log(error);
                });

        });
    }

    setUserData(data:any) {
        this.storage.set(this.USER_DATA, data);
    }

    getUserData() {
        return this.storage.get(this.USER_DATA).then((data)=> {
            return data;
        });
    };

    getNama() {
        return this.storage.get(this.USER_DATA).then((data)=> {
            return data.nama;
        });
    };

    getUsername() {
        return this.storage.get(this.USER_DATA).then((data)=> {
            return data.username;
        });
    };

    getAvatar() {
        return this.storage.get(this.USER_DATA).then((data)=> {
            return this.globalService.backend.baseUrl + '/' + data.pic;
        });
    };

    // return a promise
    hasLoggedIn() {
        return this.storage.get(this.HAS_LOGGED_IN).then((data) => {
            return data === true;
        });
    };

    checkHasSeenTutorial() {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then((data) => {
            return data;
        })
    };

}
