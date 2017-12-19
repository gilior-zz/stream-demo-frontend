import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppService {

  private _stream: any;
  private _url = 'http://localhost:58949/api/test';

  constructor(private _http: HttpClient) {
  }

  getStream() {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('accept', 'application/octet-stream');
    httpHeaders.set('content-type', 'application/octet-stream');
    return this._http.get(this._url, {
      headers: httpHeaders,
      responseType: 'arraybuffer'
    })
      .map(buffer => {
        // let blob = new Blob([buffer]);
        // var fileReader = new FileReader();
        // let arrayBuffer = buffer;
        // fileReader.readAsArrayBuffer(blob);
        // var byteArray = new Uint8Array(arrayBuffer);
        // console.log(byteArray);
        return Observable.of(buffer);
      })
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
