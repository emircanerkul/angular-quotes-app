import { NgModule } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AuthorPipe } from 'src/app/pipe/author/author.pipe';

@NgModule({
  declarations: [TimeAgoPipe, AuthorPipe],
  exports: [TimeAgoPipe, AuthorPipe]
})
export class MainModule {}
