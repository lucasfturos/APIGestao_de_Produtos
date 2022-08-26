import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {

  constructor(private alertController: AlertController, private router: Router) { }
  async warningAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      subHeader: 'Cadastro de Produto',
      message: 'Cadastro de produto realizado com sucesso',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/']);
        }
      }],
    });

    await alert.present();
  }

}
