import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../service/apiservice.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent  {

  constructor(
    private modalController: ModalController,
    private service: APIServiceService,
  ) { }



  closeModal() {
    this.modalController.dismiss();
  }

  showModal(){}
}
