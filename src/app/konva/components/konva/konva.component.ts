import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import {KonvaService} from "../../service/konva.service";
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";

enum EKonvaButton {
  Line = 'line',
  Eraser = 'eraser',
  Arrow = 'arrow',
  Circle = 'circle',
  Square = 'rect',
  Pencil = 'brush'
}

interface Folder {
  name: string;
  file?: File;
  children: Folder[];
}

const acceptedGlobalExtensions =
  '.doc .pptx .docx .pdf .xls .xlsx .ppt .png .jpg .jpeg .dng .tiff .heic .txt .xlsm .pages .ai .psd .tiff .dxf .svg .zip .rar .mov .qt .mp4 .avi .mkv';

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.scss']
})
export class KonvaComponent {

  public files: NgxFileDropEntry[] = [];
  accept = acceptedGlobalExtensions;
  folders: Folder[] = [];

  drop(files: NgxFileDropEntry[]): void {
    this.files = files;
    for (const droppedFile of files) {

      const adr = droppedFile.relativePath.split('/');
      adr.pop();

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // .....

          if (adr?.length) {
            this.searchFolder(this.folders, adr, file)
          } else {
            this.folders.push({
              name: file.name,
              file,
              children: []
            })
          }
        });
      } else {
        if (adr?.length) {
          this.searchFolder(this.folders, adr)
        }
      }
    }

    console.log('FOLDER', this.folders);
  }


  searchFolder(folder: Folder[], folderStructure: string[], file?: File): void {
    if (folderStructure[0]) {
      const name = folderStructure[0];

      const idx = folder.findIndex(el => el.name === name);

      if (idx === -1) {
        const l = folder.push({
          name: name,
          children: []
        });

        if (folderStructure.length === 1) {
          if (file) {
            folder[l - 1].children.push({
              name: file?.name,
              file: file,
              children: []
            })
          }
        }

        if (folderStructure.slice(1).length) {
          this.searchFolder(folder[l - 1].children, folderStructure.slice(1), file);
        }
      } else {

        if (folderStructure.length === 1) {
          if (file) {
            folder[idx].children.push({
              name: file?.name,
              file: file,
              children: []
            })
          }
        }

        if (folderStructure.slice(1).length) {
          this.searchFolder(folder[idx].children, folderStructure.slice(1), file);
        }
      }
    }
  }
}
