import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Stage} from "konva/lib/Stage";
import {Layer} from "konva/lib/Layer";
import {KonvaService} from "../../service/konva.service";

enum EKonvaButton {
  Line = 'line',
  Eraser = 'eraser',
  Arrow = 'arrow',
  Circle = 'circle',
  Square = 'rect',
  Pencil = 'brush'
}

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.scss']
})
export class KonvaComponent implements OnInit {
  container = 'konva-container';
  shapes: any = [];
  stage!: Stage;
  layer!: Layer;
  inkColor: string = '#000000';
  controlButton = EKonvaButton;
  activeButton = '';
  selectedButton: any = {
    [this.controlButton.Line]: false,
    [this.controlButton.Eraser]: false,
    [this.controlButton.Arrow]: false,
    [this.controlButton.Circle]: false,
    [this.controlButton.Square]: false,
    [this.controlButton.Pencil]: false,
  }
  eraser: boolean = false;
  transformers: Transformer[] = [];
  brushSize: number = 3;
  brushOpacity: number = 1.0;
  background = 'https://www.houseplanshelper.com/images/how-to-read-floor-plans-full-floor-plan.jpg';

  @ViewChild('konvaContainer', {static: true}) konvaContainer!: ElementRef;

  constructor(
    private konvaService: KonvaService
  ) { }

  ngOnInit(): void {
    this.stage = new Stage({
      container: this.container,
      width: this.konvaContainer.nativeElement.offsetWidth,
      height: this.konvaContainer.nativeElement.offsetHeight,
    });
    this.stage.toDataURL()
    this.layer = new Layer();
    this.stage.add(this.layer);
    this.addLineListeners();
  }

  clearSelection(button: string): void {
    Object.keys(this.selectedButton).map(key => {
      if (key === button) return
      this.selectedButton[key] = false
    });
  }

  setSelection(key: string) {
    this.activeButton = key;
    this.clearSelection(key);
    this.selectedButton[key] = !this.selectedButton[key];
  }

  addLineListeners(): void {
    const component = this;
    let lastLine: any;
    let isPaint: boolean = false;
    this.stage.on('mousedown touchstart', function () {
      if (!component.activeButton) {
        return;
      }
      isPaint = true;
      let pos = component.stage.getPointerPosition();
      Object.keys(component.selectedButton).map(key => {
        if (component.selectedButton[key]) {
          // @ts-ignore
          lastLine = component.konvaService[key](
            pos,
            component.brushSize,
            component.inkColor,
            component.brushOpacity
          )
        }
      })

      component.shapes.push(lastLine);
      component.layer.add(lastLine);
    });

    this.stage.on('mouseup touchend', function () {
      isPaint = false;
    });

    this.stage.on('mousemove touchmove', function (e) {
      if (!isPaint) {
        return;
      }
      if (!component.activeButton) {
        return;
      }
      let newPoints: any;
      e.evt.preventDefault();
      const position: any = component.stage.getPointerPosition();
      const attr = lastLine.getAttrs();

      switch (component.activeButton) {
        case component.controlButton.Square:
          const width = position.x - attr.x;
          const height = position.y - attr.y;
          lastLine.width(width);
          lastLine.height(height);
          break;
        case component.controlButton.Circle:
          const offsetX = attr.x - position.x;
          const offsetY = attr.y - position.y;
          const radius = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))/2;
          lastLine.radius(radius)
          lastLine.offsetX(offsetX/2);
          lastLine.offsetY(offsetY/2);
          break;
        case component.controlButton.Line:
          const point = lastLine.points();
          point[2] = position.x;
          point[3] = position.y;
          lastLine.points(point);
          break;
        case component.controlButton.Arrow:
          const pointArrow = lastLine.points();
          pointArrow[2] = position.x;
          pointArrow[3] = position.y;
          lastLine.points(pointArrow);
          break;
        default:
          newPoints = lastLine.points().concat([position.x, position.y]);
          lastLine.points(newPoints);
      }

      component.layer.batchDraw();
    });
  }

  undo(): void {
    const removedShape = this.shapes.pop();

    this.transformers.forEach(t => {
      // @ts-ignore
      t.detach();
    });

    if (removedShape) {
      removedShape.remove();
    }

    this.layer.draw();
  }

  clearBoard(): void {
    this.layer.destroyChildren();
    this.layer.draw();
  }

  saveAsImage(): void {
    console.log(this.stage.toObject())
  }

  get getCursorClass(): string {
    if (this.selectedButton['brush'] || this.selectedButton['eraser']) {
      return 'pointer_cursor';
    } else {
      return 'default';
    }
  }
}
