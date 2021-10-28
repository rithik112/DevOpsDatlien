import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(public loaderService: SpinnerService) { }

  ngOnInit(): void {
  }

}
