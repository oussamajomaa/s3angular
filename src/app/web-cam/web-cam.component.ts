import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam'
import { Subject, Observable } from 'rxjs'

@Component({
  selector: 'app-web-cam',
  templateUrl: './web-cam.component.html',
  styleUrls: ['./web-cam.component.css']
})
export class WebCamComponent {

  public buttonDisabled: boolean = false;

  public index = 0

  public base64: string = ""
  
  public text: string = "Prendre une photo"

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  triggerSnapshot(): void {
    this.trigger.next();
    this.text = "Modifier la photo" 
    this.buttonDisabled = false
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.base64 = this.webcamImage.imageAsDataUrl
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  savaImage() {
    this.index+=1
    if (this.index<7){
      let a = document.createElement('a');
      a.setAttribute('download', "fileName");
      a.setAttribute('href', this.base64);
      a.click();
      this.text = "Prendre une photo"
      let img = document.createElement('img')
      img.setAttribute('src', this.base64)
      img.setAttribute('class', 'base64, w-100')
      document.getElementById('p'+this.index)?.appendChild(img)
      this.buttonDisabled = !this.buttonDisabled
    }else{
      alert('6 photos ont été prises')
    }

  }


}
