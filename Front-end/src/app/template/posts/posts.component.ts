import { Component, OnInit } from '@angular/core';
import { QueriesService }    from '../../services/queries.service';
import { global }            from '../../services/global';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private apiPost   : any     = global.api_post;
  public data       : any     = [];
  public totalPage  : number;
  public cantidadReg: number  = 20;
  public page       : number;
  public npage      : number  = 1;
  public paginacion : any     = [];
  public nextPage;
  public prevPage;

  constructor(
    private queriesService: QueriesService
  ) { }

  ngOnInit() {
    this.Post(1);
  }

  Post(n_page){
    document.getElementById('arriba').scrollIntoView({behavior: 'smooth'});
    this.npage  = n_page;
    let ruta    = this.apiPost + "&q=artificial%20intelligence&page=" + this.npage +'&pageSize='+ this.cantidadReg;
    
    this.queriesService.queryGet(ruta).then((data) => {
      this.data['posts']  = data['articles'];
      this.totalPage      = data['totalResults'];
      this.page           = Math.ceil(this.totalPage / this.cantidadReg); 
      this.paginacion     = [];

      for(let i=1; i<=this.page; i++){
        if(i <= 5){
          if(this.npage>5){
            this.paginacion.push(i+(this.npage-5));
          }else{
            this.paginacion.push(i);
          }
        }
      }
      if(this.npage>=2){
        this.prevPage = this.npage-1;
      }else{
        this.prevPage = 1;
      }
      if(this.npage<this.page){
        this.nextPage = this.npage+1;
      }else{
        this.nextPage = this.page;
      }
    });
  }
}
