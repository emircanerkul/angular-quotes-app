import { Pipe, PipeTransform } from '@angular/core';
import { AuthorService } from 'src/app/service/author/author.service';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {
  constructor(private authorService: AuthorService) {}
  transform(value: string): any {
    return this.authorService.getAuthor(value);
  }
}
