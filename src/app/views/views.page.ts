import { ViewsComponent } from './views.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { APIServiceService } from '../service/apiservice.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.page.html',
  styleUrls: ['./views.page.scss'],
})
export class ViewsPage implements OnInit{

  listData: any;

  constructor(
    private modalController: ModalController,
    private service: APIServiceService,
    private alertController: AlertController,
  ) { }

  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      console.log(res, 'res==>');
      this.listData = res.data;
    });
  }

  deleteData(cod_bar: any) {
    this.service.deleteData(cod_bar).subscribe((res) => {
      console.log('delete==>', res);
      window.location.reload();
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ViewsComponent
    });
    await modal.present();
  }
  onChangeColorTheme(event) {

  }

  async warningAlert(cod_bar: any, nome: any) {
    const alert = await this.alertController.create({
      header: 'Excluir Produto: '+ nome,
      message: 'Tem certeza que deseja excluir o produto '+ nome,
      buttons: [{
        text: 'Não',
        cssClass: 'alert-button-cancel',
      },
      {
        text: 'Sim',
        cssClass: 'alert-button-confirm',
        handler:() =>  {
          this.deleteData(cod_bar);
        }
        },
      ],
    });
    await alert.present();
  }
}
