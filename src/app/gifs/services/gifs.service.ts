import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  private apiKey: string = '6sp4Kj05D5NNAgBulRrNaXxs4T0KOLWX';

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagsHistory.filter(
        (elementTag) => elementTag !== tag
      );
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  addTag(tag: string): void {
    if (tag.length == 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit, 10', '10')
      .set('q', tag);

    this.http
      .get(
        `${this.serviceUrl}/search?`, { params }
      )
      .subscribe((resp) => {
        console.log(resp);
      });

      
    // fetch(
    //   'http://api.giphy.com/v1/gifs/search?api_key=6sp4Kj05D5NNAgBulRrNaXxs4T0KOLWX&q=baki%20hanma&limit=10'
    // )
    // .then( resp => resp.json())
    // .then(data => console.log(data));
  }
}
