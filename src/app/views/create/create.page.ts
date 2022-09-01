import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  qrText: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
  ) {  }

  startScanning() {
    // this.barcodeScanner.scan().then(barcodeData => {
    //   this.qrText = barcodeData.text;
    //   console.log('Barcode data', this.qrText);
    //  }).catch(err => {
    //      console.log('Error', err);
    //  });
  }

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
