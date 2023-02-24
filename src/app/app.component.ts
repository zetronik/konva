import {Component} from '@angular/core';
import {KonvaService} from "./konva/service/konva.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [KonvaService]
})
export class AppComponent {

}
