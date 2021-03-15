import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-global-loading',
  templateUrl: './global-loading.component.html',
  styleUrls: ['./global-loading.component.scss']
})
export class GlobalLoadingComponent implements OnInit {

  isLoading = false;
  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.getLoading()
      .subscribe( (loading) => {
        this.isLoading = loading;
      });
  }

}
