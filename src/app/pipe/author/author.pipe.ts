import { Pipe, PipeTransform } from '@angular/core';
import { AuthorService } from 'src/app/service/author/author.service';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {
  constructor(private authorService: AuthorService) {}
  async transform(value: string): Promise<any> {
    return this.authorService.getAuthorName(value);
  }
}
