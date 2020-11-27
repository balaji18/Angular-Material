import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar, MatDialog} from '@angular/material';
import { FormsComponent } from './forms/forms.component';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}
  myContorl = new FormControl();
  title = 'material-demo';
  notification = 0;
  showSpinner = false;
  opened = false;
  selectedValue: string;
  filteredOptions: Observable<string[]>;
  minDate = new Date();
  maxDate = new Date(2020, 10, 30);
  numbers =[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // To block saturday and sunday

  dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6;
  }
  options: string[] = ['Angular', 'React', 'Vue'];
  objectOptions = [
    {name: 'Angular'},
    {name: 'Angular Material'},
    {name: 'React'},
    {name: 'Vue'}
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
   // this.dataSource.sort = this.sort;
     for (var i= 0; i<= 1000; i++) {
        this.numbers.push(i);
     }
    this.filteredOptions = this.myContorl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  log(state) {
    console.log(state);
  }

  logs(index) {
    console.log(index);
  }

  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  openSnackBar(message, action) {
    const snackBarRef = this.snackBar.open(message, action, {duration: 2000});
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    });
  }

  openCustomSnackBar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {duration: 2000});
  }

  openDialog() {
    console.log('coming inside');
    const dialogRef = this.dialog.open(FormsComponent, {data: {name: 'Balaji'}});
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


@Component({
  selector: 'app-custom-snackbar',
  template: `<span style='color:orange'>Custom SnackBar</span>`
})

export class CustomSnackBarComponent {}
