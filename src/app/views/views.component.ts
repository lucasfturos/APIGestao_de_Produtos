import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent  {

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

  showModal(){}
}
