import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-dark',
  templateUrl: './button-dark.component.html',
  styleUrls: ['./button-dark.component.scss']
})
export class ButtonDarkComponent implements OnInit {

  @Input() buttonInfoText?: string;

  @Input() buttonInfoLink?: string;

  @Input() symbol?: string;

  @Input() inSideNavBar?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  openExternalLink(url: string) {
    window.open(url, '_blank');
  }

}
