import { Injectable } from '@angular/core';
import {Line} from "konva/lib/shapes/Line";
import {Arrow} from "konva/lib/shapes/Arrow";
import {Rect} from "konva/lib/shapes/Rect";
import {Circle} from "konva/lib/shapes/Circle";

@Injectable()
export class KonvaService {
  brushSize!: number;
  brushOpacity!: number;

  brush(pos: any, size: any, color: string, opacity: number) {
    this.brushSize = size;
    this.brushOpacity = opacity;
    return new Line({
      stroke: '#D92C26',
      strokeWidth: size,
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      lineJoin: 'bevel',
      opacity: opacity,
      tension: 0,
    });
  }

  arrow(pos: any, size: any, color: string, opacity: number) {
    return new Arrow({
      points: [pos.x, pos.y, pos.x, pos.y],
      opacity: opacity,
      fill: '#ff8a00',
      stroke: '#ff8a00',
      strokeWidth: 4,
    });
  }

  rect(pos: any, size: any, color: string, opacity: number) {
    return new Rect({
      stroke: '#0055FF',
      width: 0,
      height: 0,
      x: pos.x,
      y: pos.y,
    });
  }

  line(pos: any, size: any, color: string, opacity: number) {
    return new Line({
      stroke: '#22fa03',
      strokeWidth: size,
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y, pos.x, pos.y],
      opacity: opacity,
      tension: 100,
    });
  }

  circle(pos: any, size: any, color: string, opacity: number) {
    return new Circle({
      stroke: '#ff0808',
      x: pos.x,
      y: pos.y,
      radius: 1,
    });
  }

  erase(pos: any, size: any) {
    return new Line({
      stroke: '#ffffff',
      strokeWidth: size,
      globalCompositeOperation: 'destination-out',
      points: [pos.x, pos.y, pos.x, pos.y],
      lineCap: 'round',
      lineJoin: 'round'
    });
  }
}
