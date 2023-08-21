import { Component, OnInit }      from '@angular/core';
import { QueriesService }         from '../../services/queries.service';
import { ActivatedRoute }         from '@angular/router';
import { global }                 from '../../services/global';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {
  private apiPost : any = global.api_post;
  private data    : any = [];
  private num_post: number;

  constructor(
    private queriesService: QueriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.Post()
  }

  Post(){
    this.activatedRoute.params.subscribe(params =>{
      this.num_post = params['num'];
      var url = this.apiPost + "&q=" + this.num_post;
      this.queriesService.queryGet(url).then((data) => {
        this.data['posts'] = data['articles'][0];
      });
    });
  }
}
