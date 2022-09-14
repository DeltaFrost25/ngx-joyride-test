import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent implements OnInit {
  @Input() openModal: boolean = true;
  @Input() title: string = '';
  @Input() paragraph: string = '';
  @Input() image: string = '';
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit(true);
  }
}
