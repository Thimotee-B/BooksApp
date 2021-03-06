import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ListsService } from 'src/app/service/lists/lists.service';
import { SearchService } from '../../../service/search/search.service';
import { UserService } from '../../../service/user/user.service'

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

    @Input() found: boolean = false;
    @Input() length: number = 0;
    @Input() searching: boolean = false;
    @Input() books: any;
    currentBook: any;
    bookToSend: any;
    isAuth: boolean = false;

    constructor(private _searchService: SearchService, private _listsService: ListsService, private _authService: AuthService) {
        this.isAuth = _authService.isAuth;
    }

    ngOnInit(): void {
        this.currentBook = this._searchService.getChosenBook();
        this.bookToSend = this._listsService.getBookToSend();
        this.isAuth = this._authService.isAuth;
        this._searchService.sub(this);
        this._listsService.sub(this);
        this._authService.sub(this);
    }

    chooseABook(bookFormat: any, bookToSend: any): void {
        this._searchService.setChosenBook(bookFormat);
        this._listsService.setBookToSend(bookToSend);
    }

    setChosenBook(book: any): void {
        this.currentBook = book;
    }

    setBookToSend(book: any): void {
        this.bookToSend = book;
    }

    setIsAuth(value: boolean): void {
        this.isAuth = value;
    }



    addToFav() {
        this._listsService.addToFav(JSON.stringify(this.bookToSend))
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            )
        return;
    }

    addToRead() {
        this._listsService.addToRead(JSON.stringify(this.bookToSend))
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            )
        return;
    }
    addToToRead() {
        this._listsService.addToToRead(JSON.stringify(this.bookToSend))
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(error);
                }
            )
        return;
    }
}



