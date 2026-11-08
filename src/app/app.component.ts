import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  folders: { [folderName: string]: string[] } = {};
  folderNames: string[] = [];
  selectedFolder: string = '';
  currentImages: string[] = [];
  currentIndex: number = 0;

  onFolderSelected(event: any) {
    const files: FileList = event.target.files;
    this.folders = {};
    this.folderNames = [];
    this.selectedFolder = '';
    this.currentImages = [];
    this.currentIndex = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Image files mattum filter panrom
      if (file.type.startsWith('image/')) {
        const pathParts = file.webkitRelativePath.split('/');
        // Path structure: RootFolder / SubFolder / image.jpg
        if (pathParts.length >= 2) {
          const folderName = pathParts[pathParts.length - 2];
          
          if (!this.folders[folderName]) {
            this.folders[folderName] = [];
          }
          
          const imageUrl = URL.createObjectURL(file);
          this.folders[folderName].push(imageUrl);
        }
      }
    }

    this.folderNames = Object.keys(this.folders);
    if (this.folderNames.length > 0) {
      this.selectFolder(this.folderNames[0]);
    }
  }

  selectFolder(folderName: string) {
    this.selectedFolder = folderName;
    this.currentImages = this.folders[folderName] || [];
    this.currentIndex = 0;
  }

  nextImage() {
    if (this.currentIndex < this.currentImages.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}