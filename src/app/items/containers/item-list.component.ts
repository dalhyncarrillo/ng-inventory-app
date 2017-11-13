import { Component, OnInit, Input } from '@angular/core';
import { ifElse, identity } from 'ramda';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { routerActions } from '../../store';

import { ModalService } from '../../core';
import { Item, StockLevel, calcStockLevel, ItemFilters } from '../models';
import { itemActions } from '../store';
import * as itemSelectors from '../store/selectors';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: [`
    .low-stock { color: red; }
  `],
})
export class ItemListComponent implements OnInit {
  StockLevel = StockLevel;

  @Input() searchText: string;
  public model;

  constructor(
    private store: Store<AppState>,
    private modal: ModalService
  ) {
    this.model = Observable.combineLatest(
      this.store.select(itemSelectors.getAll),
      this.store.select(itemSelectors.getIsBusy),
      this.store.select(itemSelectors.getError),
      (entities, isBusy, error) => ({ entities, isBusy, error })
    );
  }

  ngOnInit() {
    this.store.dispatch(itemActions.loadAll.started());
  }

  addItem() {
    this.store.dispatch(itemActions.addOne.started());
  }

  deleteItem(item: Item) {
    this.modal.confirm('Are you sure?')
      .subscribe(ifElse(identity,
        () => this.store.dispatch(itemActions.removeOne.started(item)),
        () => false
      ));
  }

  navigateToItemDetails(item) {
    this.store.dispatch(routerActions.go({ path: ['/items', item.id] }));
  }

  stockLevel(item: Item) {
    return calcStockLevel(item);
  }

  onFilterChanged(searchText) {
    const filters: ItemFilters = { searchText };
    this.store.dispatch(itemActions.setFilters(filters));
  }

  quantityChanged(item) {
    this.store.dispatch(itemActions.saveOne.started(item));
  }
}
