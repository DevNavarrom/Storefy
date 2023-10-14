import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  
  @Input() total: number = 0;
  @Output() eventPagination = new EventEmitter<number>();

  items: number[] = [];
  currentPage: number = 0;
  
  ngOnInit(): void {

    if (this.total) {
      let pages: number = (this.total / 5) | 0;
      if (this.total % 5 > 0) pages++;

      this.total = pages;

      for (let i = 1; i <= this.total; i++) {
        this.items.push(i);
      }      
    }

  }

  handlePagination(value: number): void {
    this.currentPage = value-1;
    
    this.eventPagination.emit(value-1);
  }

  nextPage(): void {
    if(this.currentPage < this.items.length-1) {
      this.eventPagination.emit(this.currentPage+1);
      this.currentPage++;
    }
  }

  backPage(): void {
    if(this.currentPage > 0){
      this.currentPage--;
      this.eventPagination.emit(this.currentPage);
    }
  }
}
