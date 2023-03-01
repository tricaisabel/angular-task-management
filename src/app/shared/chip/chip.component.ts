import { Component, Input, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @ViewChild('tooltip') tooltip: MatTooltip;
  @Input('text') text: string;

  changeTooltip(event: any) {
    event.stopPropagation();
    event.preventDefault();

    this.tooltip.message = 'Copied!';
    this.tooltip.show();
  }
}
