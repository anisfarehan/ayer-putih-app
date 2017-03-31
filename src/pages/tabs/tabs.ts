import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

//import { AkaunPage } from '../akaun/akaun';
//import { MapPage } from '../map/map';
//import { SchedulePage } from '../schedule/schedule';
//import { SpeakerListPage } from '../speaker-list/speaker-list';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  //tab1Root: any = AkaunPage;
  //tab2Root: any = SpeakerListPage;
  //tab3Root: any = MapPage;
  //tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
