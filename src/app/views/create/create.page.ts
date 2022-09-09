import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from '../../service/apiservice.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {
  qrText: any;
  isSubmitted = false;
  produtoForm = new FormGroup({
    'nome': new FormControl('',Validators.required),
    'descricao': new FormControl('',Validators.required),
    'quantidade': new FormControl('',Validators.required),
    'preco': new FormControl('',Validators.required),
    'cod_bar':new FormControl('',Validators.required)
  });

  constructor(
    private alertController: AlertController,
    private router: Router,
    private service: APIServiceService
  ) {  }

  startScanning() {
    // this.barcodeScanner.scan().then(barcodeData => {
    //   this.qrText = barcodeData.text;
    //   console.log('Barcode data', this.qrText);
    //  }).catch(err => {
    //      console.log('Error', err);
    //  });
  }

  produtoSubmit() {
    this.isSubmitted = true;
    if (!this.produtoForm.valid) {
      console.log(this.errorControl);
      return false;
    } else {
      console.log(this.produtoForm.value);
      this.service.createData(this.produtoForm.value).subscribe((res) => {
        console.log('res==>', res);
        this.produtoForm.reset();
      });
      this.successAlert();
    }
  }
  get errorControl() {
    return this.produtoForm.controls;
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Cadastro do produto foi realizado com sucesso',
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
