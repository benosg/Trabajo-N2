import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private httpClient: HttpClient) { }

  public queryGet(url){
    return new Promise( (resolve, reject) => {
      this.httpClient.get(url).pipe(
        map((res: Response) => res)
      ).subscribe(
        (data)  => { 
          resolve(data); 
        },
        (err)   => {
          console.log("error desde el servicio");
          console.log(err);
          reject();
        }
      );
    });
  }
}
