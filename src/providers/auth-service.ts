import {Injectable} from '@angular/core';
import {Http, RequestMethod, Headers, RequestOptions, Request} from '@angular/http';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import {UserData} from './user-data';
import {GlobalService} from './global-service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    constructor(public http:Http, public globalService:GlobalService,
                public storage:Storage, public userData:UserData) {
    }

    public login(credentials:any) {
        if (credentials.number_ic === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create((observer:any) => {
                // At this point make a request to your backend to make a real check!
                var postData = ({
                    number_ic: credentials.number_ic.trim(),
                    password: credentials.password.trim()
                });

                var headers = new Headers();
                headers.append("Content-Type", 'application/json');
                var requestoptions = new RequestOptions({
                    method: RequestMethod.Post,
                    url: "http://localhost:8484/Psm/LoginServlet",
                    headers: headers,
                    body: JSON.stringify(postData)
                });

                // this.http.post("http://localhost:8484/Psm/LoginServlet", postData)
                return this.http.request(new Request(requestoptions))
                    .subscribe((responseData:any) => {
                        console.log(responseData.json());

                        if (responseData.json().responseStatus) {
                            observer.next(false);
                            observer.complete();
                        } else {
                            setTimeout(()=> {
                                var userData = responseData.json();
                                //set the current user data from backend
                                this.userData.setUserData(userData);

                                console.log(userData);
                                var isValid:boolean = (credentials.number_ic === userData.number_ic);
                                this.userData.events.publish('user:login');

                                observer.next(true);
                                observer.complete();
                            });
                        }
                    }, (error:any) => {
                        console.log(error);
                    });

            });
        }
    }

    public signup(credentials:any) {
        if (credentials.phone === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            // At this point store the credentials to your backend!
            /*this.storage.set(this.HAS_LOGGED_IN, true);
             this.setUsername(username);*/
            this.userData.events.publish('user:signup');

            return Observable.create((observer:any) => {
                observer.next(true);
                observer.complete();
            });
        }

    };

    public logout() {
        return Observable.create((observer:any) => {
            this.userData.storage.remove(this.userData.HAS_LOGGED_IN);
            this.userData.storage.remove('username');
            this.userData.storage.clear();
            this.userData.events.publish('user:logout');
            this.globalService.storage.clear();

            observer.next(true);
            observer.complete();
        });
    };

}
