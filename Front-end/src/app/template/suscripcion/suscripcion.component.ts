import { Component, OnInit, Input } from '@angular/core';
import { QueriesService }    from '../../services/queries.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { global }            from '../../services/global';
import { Suscribir }         from '../../services/suscribir';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {
  
  private api_news_jsonserver : string  = global.api_news_jsonserver;
  private suscribirModel                = new Suscribir("","");
  public response_api_news    : any     = {
    'show': false,
    'text': ''
  }

  constructor(
    private queriesService: QueriesService
  ) { }

  ngOnInit() {
  }

  submitSuscripcion(form) {
    if(this.suscribirModel.email){
      this.queriesService.queryPost(this.api_news_jsonserver, this.suscribirModel).then(
        (data) => {
          this.response_api_news.show = true;
          if(data){
            this.response_api_news.text = 'Su suscripción ha sido enviado con éxito';
            form.reset();
          }else{
            this.response_api_news.text = 'No fue posible guardar su información. Por favor, intente más tarde o comuníquese con nosotros';
          }
        },
        (error) => {
          this.response_api_news.show = true;
          this.response_api_news.text = 'Ha ocurrido un problema. Por favor, intente más tarde';
        }
      );
    }
  }

}
