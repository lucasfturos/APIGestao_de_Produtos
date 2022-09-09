import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from '../../service/apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit{
  qrText: any;
  isSubmitted = false;
  getParamCodBar: any;

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
    private activeRouter: ActivatedRoute,
    private service: APIServiceService
  ) {  }


  ngOnInit(): void {
    this.getParamCodBar = this.activeRouter.snapshot.paramMap.get('cod_bar');
    this.service.getUniqueData(this.getParamCodBar).subscribe((res) => {
      console.log('res=>', res);
      this.produtoForm.patchValue({
        'nome': res.data[0].nome,
        'descricao': res.data[0].descricao,
        'quantidade': res.data[0].quantidade,
        'preco': res.data[0].preco,
        'cod_bar': res.data[0].cod_bar,
      });
    });
  }

  startScanning() {
    // this.barcodeScanner.scan().then(barcodeData => {
    //   this.qrText = barcodeData.text;
    //   console.log('Barcode data', this.qrText);
    //  }).catch(err => {
    //      console.log('Error', err);
    //  });
  }

  // Criar produto
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
      this.submitAlert();
    }
  }

  // Atualizar produto
  produtoUpdate() {
    this.isSubmitted = true;
    if (!this.produtoForm.valid) {
      console.log(this.errorControl);
      return false;
    } else {
      console.log(this.produtoForm.value);
      this.service.updateData(this.produtoForm.value, this.getParamCodBar).subscribe((res) => {
        console.log('res==>', res);
        this.produtoForm.reset();
        this.updateAlert();
      });
    }
  }

  get errorControl() {
    return this.produtoForm.controls;
  }

  async submitAlert() {
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

  async updateAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Atualização dos dados do produto foi realizado com sucesso',
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
