import { ViewsComponent } from './views.component';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-views',
  templateUrl: './views.page.html',
  styleUrls: ['./views.page.scss'],
})
export class ViewsPage {
  // Use matchMedia to check the user preference
  constructor(private modalController: ModalController) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: ViewsComponent
    });
    await modal.present();
  }
  onChangeColorTheme(event) {

  }
}
