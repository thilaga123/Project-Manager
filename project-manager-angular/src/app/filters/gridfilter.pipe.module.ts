import { NgModule } from '@angular/core';
import {GridfilterPipe} from './gridfilter.pipe';
import {FilterPipe} from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [GridfilterPipe,FilterPipe],
  exports: [GridfilterPipe,FilterPipe]
})
export class GridfilterPipeModule { 
 static forRoot() {
  return {
      ngModule: GridfilterPipeModule,
      providers: [GridfilterPipe,FilterPipe],
  };
}
}
