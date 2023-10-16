import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() callbackTerm: EventEmitter<any> = new EventEmitter<any>();
  words: string = '';

  constructor( private router: Router ) {}

  handleSearch(term: any): void {
    if (term.length >= 3) {
      this.callbackTerm.emit(term);
    }
  }

  navigate(): void {
    this.router.navigate(['/products/create']);
  }
}
