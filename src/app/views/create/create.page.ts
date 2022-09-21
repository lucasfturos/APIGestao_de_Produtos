import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from '../../service/apiservice.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, AfterViewInit, OnDestroy{
  result: any;
  isSubmitted = false;
  getParamCodBar: any;
  scanActive = false;

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

  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    const root = document.querySelector(':root') as HTMLElement;
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  }

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

  async startScanning() {
    const root = document.querySelector(':root') as HTMLElement;
    const allowed = await this.checkPermissionCam();
    document.querySelector('body').classList.add('scanner-active');
    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      console.log('Resultado do scan', result);
      if (result.hasContent){
        this.result = result.content;
        this.scanActive = false;

      }
    }
  }

  stopScanning() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async checkPermissionCam() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      console.log('Check de permissao', status);
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'Permissão Negada',
          message: 'Por favor, permita o acesso a câmera pelas configurações do APP',
          buttons: [{
            text: 'Não',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Abrir configurações',
            cssClass: 'alert-button-confirm',
            handler:() =>  {
              resolve(false);
              BarcodeScanner.openAppSettings();
            }
            },
          ],
        });
        await alert.present();
      } else {
        resolve(false);
      }
    });
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
