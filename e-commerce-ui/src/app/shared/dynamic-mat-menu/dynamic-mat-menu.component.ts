import {Component, Input} from '@angular/core';

@Component({
  selector: 'dynamic-mat-menu',
  templateUrl: './dynamic-mat-menu.component.html',
  styleUrl: './dynamic-mat-menu.component.scss'
})
export class DynamicMatMenuComponent {
  // @Input() data = [];
  // @Input() trigger = "Trigger";
  // @Input() isRootNode = false;
  //
  // isLoading = false;
  // dataLoaded = false;
  //
  // constructor() {}
  //
  // getData(node: string) {
  //   if (!this.dataLoaded) {
  //     this.isLoading = true;
  //     this.fetchChildren(node).subscribe((d) => {
  //       this.data = d?.slice() || [];
  //       this.isLoading = false;
  //       this.dataLoaded = true;
  //     });
  //   }
  // }
  //
  // fetchChildren(node) {
  //   return this.data.map(v => v.name);
  // }
  //
  // isExpandable(node: string) {
  //   return this.data;
  // }
}
