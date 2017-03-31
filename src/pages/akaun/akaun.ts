
import { NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';

import { ChannelData } from '../../providers/channel-data';

import { Platform } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AkaunPage');
  }

}
