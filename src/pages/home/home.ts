import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  membersRef: Observable<any[]>;
  members: any = [];

  constructor(public navCtrl: NavController, private dbRef: AngularFireDatabase) {
    this.membersRef = dbRef.list('members').valueChanges();
  }

  ionViewWillEnter() {
    this.membersRef.subscribe((data: any) => {
      this.members = data;
    });
  }

}
