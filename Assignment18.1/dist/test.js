"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("./linked-list");
const list = new linked_list_1.LinkedList(1, 2, 3, 4, 5);
console.log("Initial List:", list.toString()); // LinkedList( 1    2    3    4    5 )
console.log("Size of List:", list.size()); // 5
console.log("Element at index 0:", list.get(0)); // 1
console.log("Element at index 2:", list.get(2)); // 3
console.log("Element at index 4:", list.get(4)); // 5
list.set(2, 99);
console.log("List after setting index 2 to 99:", list.toString()); // LinkedList( 1    2    99    4    5 )
list.insert(3, 42);
console.log("List after inserting 42 at index 3:", list.toString()); // LinkedList( 1    2    99    42    4    5 )
const removed = list.remove(1);
console.log("Removed element:", removed); // 2
console.log("List after removing element at index 1:", list.toString()); // LinkedList( 1    99    42    4    5 )
const found = list.find(value => value === 99);
console.log("Found element:", found); // 99
const filteredList = list.filter(value => value > 10);
console.log("Filtered List (values > 10):", filteredList.toString()); // LinkedList( 99    42    )
const mappedList = list.map(value => value * 2);
console.log("Mapped List (values * 2):", mappedList.toString()); // LinkedList( 2    198    84    8    10 )
list.forEach((value, index) => {
    console.log(`Element at index ${index}: ${value}`);
});
console.log("Is the list empty?", list.isEmpty()); // false
