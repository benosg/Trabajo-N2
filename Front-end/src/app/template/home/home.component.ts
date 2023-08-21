import { Component, OnInit }  from '@angular/core';
import { QueriesService }     from '../../services/queries.service';
import { global }             from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private apiPost : any = global.api_post;
  private data    : any = [];

  constructor(
    private queriesService: QueriesService
    ) { }

  ngOnInit() {
    this.Post()
  }

  Post(){
    this.queriesService.queryGet(this.apiPost + "&pageSize=9").then((data) => {
      this.data['posts'] = data['articles'];
    });
  }

}
