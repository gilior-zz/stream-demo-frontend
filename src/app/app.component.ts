import {Component, ViewChild} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  checked: boolean = false;
  stream: any;
  videoSource: SourceBuffer;
  errorMessage: string;
  mediaSource: MediaSource;

  @ViewChild('myVideo') myVideo: HTMLVideoElement;

// @ViewChild("mediaSource") mediaSource:MediaSource;
  constructor(private _appService: AppService) {
  }

  ngOnInit() {
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', function (e) {
      try {
        this.videoSource = this.mediaSource.addSourceBuffera('application/octet-stream');
      }
      catch (e) {
        console.log('Exception calling addSourceBuffer for video', e);
        return;
      }
    }, false);
// this.videoSource=this.myVideo['nativeElement'].addSourceBuffer;
// // this.videoSource = this.mediaSource.addSourceBuffer('application/octet-stream');
  }

  onChange(e) {
    if (e.target.checked) {
      this.checked = true;
      this._appService.getStream()
        .subscribe(byteArray => {
            const player = this.myVideo['nativeElement'];
            try {
              let mediaSource = new MediaSource;
              let fileUrl = URL.createObjectURL(mediaSource);
              player.src = fileUrl;
              var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
              var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
              sourceBuffer.appendBuffer(byteArray.value);
            } catch (e) {
              console.log('Exception while appending', e);
            }
          },
          error => this.errorMessage = <any>error
        );
    } else {
      this.checked = false;
      this.myVideo['nativeElement'].pause();
    }
  }
}
