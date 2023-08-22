import { Component, OnInit } from '@angular/core';
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
  private respuesta_api       : string;
  private response_api        : any     = {
    'show': false,
    'data': ''
  }
  private suscribirModel = new Suscribir("","");

  constructor(
    private queriesService: QueriesService
  ) { }

  ngOnInit() {
  }

  /* suscripcion(form){
    const formData = new FormData();
    formData.append('array_datos', JSON.stringify(form));

    console.log(form);

    this.http.post(this.api_news_jsonserver, formData)
      .subscribe(response => {

        console.log(response)
        if(response['httpCode'] == "200"){
          this.respuesta_api = "success";
          form.reset();
          console.log(response);
          
        }else if(response['httpCode']== "403"){
          this.respuesta_api = "false";
          console.log("se conectó pero login es incorrecto");
          console.log(response['resultado'])
          
        }else{
          this.respuesta_api = "error";
          form.reset();
          console.log("se conectó pero no trajo resultado 200");
          console.log(response)
        }
      })
  } */

  /* submitSuscripcion(form, $event) {
    $event.preventDefault();

    if(form.form.value)
      this.response.show = true;
      this.queriesService.queryGet(this.urlPhp+'/mail-contacto/envio.php?nombreApellido='+this.name+'&mail='+this.email+'&consulta='+this.message).then(
      (data) => {
        if(data['respuesta'] == true){
          this.response.show = true;
          this.response.text = 'Su mensaje ha sido enviado con éxito';
          this.response.icono = 'check_circle_outline';
          this.response.color = 'texto-dg';
          this.name = "";
          this.email = "";
          this.message = "";
        }else{
          //console.log(data);
          this.response.show = true;
          this.response.text = 'Ha ocurrido un problema. Por favor, intente más tarde';
          this.response.icono = 'highlight_off';
          this.response.color = 'texto-dg-rojo';
        }
      },
      (error) => {
        console.log(error);
        this.response.show = true;
        this.response.text = 'Ha ocurrido un problema. Por favor, intente más tarde';
        this.response.icono = 'highlight_off';
        this.response.color = 'texto-dg-rojo';
      }
    );
  } */

  submitSuscripcion(form, $event) {
    $event.preventDefault();
    console.log(this.suscribirModel);

    /* if(form.form.value){
      this.queriesService.queryPost(this.api_news_jsonserver, form.form.value).then(
        (data) => {
          this.response_api.show = true;
          this.response_api.text = 'Su mensaje ha sido enviado con éxito';
        },
        (error) => {
          this.response_api.show = true;
          this.response_api.text = 'Ha ocurrido un problema. Por favor, intente más tarde';
        }
      );
    } */
  }

}
