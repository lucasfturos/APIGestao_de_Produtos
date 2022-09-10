import { ModalController, NavParams } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { APIServiceService } from '../service/apiservice.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit{
  @Input('cod_bar') cods_bar;
  listData: any;

  constructor(
    private modalController: ModalController,
    private service: APIServiceService,
    public navParams: NavParams
  ) { }

  ngOnInit(): void {
    this.service.getUniqueData(this.navParams.get('cods_bar')).subscribe((res) => {
      console.log('res=>', res);
      this.listData = res.data;
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  showModal(){}
}
