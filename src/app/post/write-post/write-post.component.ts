import { Component, OnInit } from '@angular/core';

class Demo{
  photo:String;
}

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {

  constructor() { }
  value:number=0;
  ngOnInit() {
  }
  demo = new Demo();
  photoFiles: any[] = [];
  resourceFiles: any[] = [];

  photoUrl:string;
  over:boolean=false;
  myUploader(event){
    console.log(event);
  }

  onPhotoUpload(event) {
    console.log("已经完成");
    this.demo.photo = JSON.parse(event.xhr.response).data.name;
    this.photoUrl ="upload/images/"+this.demo.photo;
    for(let file of event.files) {
      this.photoFiles.push(file);
    }
    let chosseBtn = document.querySelector(".img-upload-box .ui-fileupload-choose");
    chosseBtn['style']['display']="none";
    setTimeout(()=>{
      if(this.value==100){
        this.over=false;
        this.value=0
      }
    },1000)
  }
  onPhotoBeforeUpload(){
    console.log("onPhotoBeforeUpload");
    this.over=true;
  }
  onPhotoProgress(event){
    console.log("onProgress");

    this.value=event.progress;

  }

  remove(){
    this.demo.photo="";
    let chosseBtn = document.querySelector(".img-upload-box .ui-fileupload-choose");
    chosseBtn['style']['display']="";
  }

  onResourceUpload(event){
    for(let file of event.files) {
      this.resourceFiles.push(file);
    }
  }
}
