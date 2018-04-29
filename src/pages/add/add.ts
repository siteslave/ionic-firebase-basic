import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingCmp, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  memberRef: any;
  item: any;
  name: any;
  email: any;
  members: any;

  key: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbRef: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.memberRef = dbRef.list('members');

    this.key = this.navParams.get('key');
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
  }
  
  save() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    if (this.key) {
      this.memberRef.update(this.key, {
        name: this.name,
        email: this.email
      }).then((res: any) => {
        loader.dismiss();
        this.navCtrl.pop();
      })
        .catch((error: any) => {
          let alert = this.alertCtrl.create({ title: 'เกิดข้อผิดพลาด', subTitle: error.message });
          alert.present();
        });
    } else {
      this.memberRef.push({
        name: this.name,
        email: this.email
      }).then((res: any) => {
        loader.dismiss();
        this.navCtrl.pop();
      })
        .catch((error: any) => {
          let alert = this.alertCtrl.create({ title: 'เกิดข้อผิดพลาด', subTitle: error.message });
          alert.present();
        });
    }

  }
}
