import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopinService } from 'src/app/services/pop-in.service';

@Component({
  selector: 'app-popin',
  templateUrl: './pop-in.component.html',
  styleUrls: ['./pop-in.component.scss']
})
export class PopinComponent implements OnInit {

  message$: Observable<string>;

  constructor(private popinService: PopinService) { }

  ngOnInit() {
    this.message$ = this.popinService.currentMessage;
  }
}
