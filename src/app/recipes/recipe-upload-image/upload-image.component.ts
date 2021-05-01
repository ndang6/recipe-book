// import { Component } from "@angular/core";
// import { AngularFireStorage } from "@angular/fire/storage";
// import { Observable } from "rxjs";
// import { finalize } from "rxjs/operators";

// @Component({
//   selector: 'upload-image-app',
//   templateUrl: './upload-image.component.html'
// })
// export class UploadImageComponent{
//   selectedFile: string | ArrayBuffer;
//   downloadURL: Observable<String>;

//   constructor(private storage: AngularFireStorage){}
  
//   onSelectFile(event) { 
//     if (event.target.files && event.target.files[0]){
//       var n = Date.now();
//       const file = event.target.files[0]
//       const name = file.name.split('.')[0]
  
//       const filePath = name
//       const fileRef = this.storage.ref(filePath)
//       const task = this.storage.upload(filePath, file)
  
//       task
//         .snapshotChanges()
//         .pipe(
//           finalize(() => {
//             this.downloadURL = fileRef.getDownloadURL();
//             this.downloadURL.subscribe(url => console.log(url))
//             // https://firebasestorage.googleapis.com/v0/b/recipe-book-9d0ab.appspot.com/o/chicken-wings?alt=media&token=6a7184c3-fc6d-40f5-bffc-d54378e18efb
//           })
//         )
//         .subscribe()
//     }
//   }
// }