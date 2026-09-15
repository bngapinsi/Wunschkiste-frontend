import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  imports: [CommonModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css',
})
export class Confirm {
  @Input() headline = '';
  @Input() info = '';
  @Input() sichtbar = false;
  @Output() ok = new EventEmitter<void>();

  schliessen(): void {
    this.ok.emit();
  }

}
