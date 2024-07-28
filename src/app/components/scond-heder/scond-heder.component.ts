import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scond-heder',
  templateUrl: './scond-heder.component.html',
  styleUrls: ['./scond-heder.component.scss']
})
export class ScondHederComponent {
  @Input() text!: string;
}
