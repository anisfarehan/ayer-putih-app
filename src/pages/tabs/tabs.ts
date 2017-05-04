import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { HomePage} from '../home/home';
import {AkaunPage} from "../akaun/akaun";
import {DetailcikguPage} from "../detailcikgu/detailcikgu";
//import { MapPage } from '../map/map';
//import { SchedulePage } from '../schedule/schedule';
//import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root = HomePage;
  tab2Root = AkaunPage;
  tab3Root = DetailcikguPage;

  constructor() {

  }
}