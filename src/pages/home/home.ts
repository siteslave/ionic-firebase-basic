import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 
import { Observable } from 'rxjs/Observable';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  membersRef: any;
  members: any = [];

  constructor(public navCtrl: NavController, private dbRef: AngularFireDatabase, private loadingCtrl: LoadingController) {
    this.membersRef = dbRef.list('members')
  }

  ngOnInit() {
    this.members = this.membersRef.snapshotChanges().map(action => {
      return action.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  remove(member: any) {
    this.membersRef.remove(member.key);
  }

  edit(member: any) {
    this.navCtrl.push(AddPage, member);
  }

  goAdd() {
    this.navCtrl.push(AddPage);
  }

}
