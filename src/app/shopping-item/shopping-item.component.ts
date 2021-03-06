import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {DataService} from '../data.service';
@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
providers: [DataService]
})

export class ShoppingItemComponent implements OnInit {
// Also requirement of property to  the data coming from model
shoppingItemList: Item[] = [];
selectedItem: Item;
 toggleForm = false;
  constructor(private dataservice: DataService) { }

  getItems() {
this.dataservice.getShoppingItems().subscribe( items => {
  this.shoppingItemList = items;
console.log('data from data service:' + this.shoppingItemList[0].itemName);
});
}

addItem(form) {
 const newItem: Item = {
itemName: form.value.itemName ,
itemQuantity: form.value.itemQuantity,
itemBought: false
};
this.dataservice.addShoppingItem(newItem)
 .subscribe( item => {
   console.log(item);
   this.getItems();
});
 }

 deleteItem(id) {
 this.dataservice.deleteShoppingItem(id)
 .subscribe(data => {
   console.log(data);
   if ( data.n === 1) {
   for (let i = 0; i < this.shoppingItemList.length; i++) {
       if (id === this.shoppingItemList[i]._id) {
 this.shoppingItemList.splice(i, 1);
      } // end if
     }// end for
  } // end if
 });
}

editItem(form) {
let newItem : Item = {
_id : this.selectedItem._id,
itemName: form.value.itemName ,
itemQuantity: form.value.itemQuantity,
itemBought: form.value.itemBought
};
this.dataservice.updateShoppingItem(newItem)
.subscribe(result => {
console.log('Original Item to be Updated with old values:' + result.itemQuantity);
this.getItems();
});
 this.toggleForm = !this.toggleForm ;
}

showEditForm(item) {
this.selectedItem = item;
 this.toggleForm = !this.toggleForm;
}
updateItemChecked(item) {
item.itemBought = !item.itemBought;
this.dataservice.updateShoppingItem(item)
.subscribe(result => {
console.log('Original checkbox values' + result.itemBought);
this.getItems();
});
}
  ngOnInit() {
this.getItems();
  }

}
