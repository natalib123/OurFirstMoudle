import { v4 as uuidv4 } from 'uuid';

export class InMemoryStorage{
    constructor(){
        this.data = [];
    }

    create(collectionName, item){
        if (!this.data[collectionName]){
            this.data[collectionName] = [];
        }
        const newItem = {_id: uuidv4(), ...item}; 
        this.data[collectionName].push(newItem);
        return newItem;
    }

    find(collectionName, findfunc){
        if (!this.data[collectionName]){
            return [];
        }
        return this.data[collectionName].filter(findfunc);
    }

    where(collectionName, where){
        if (!this.data[collectionName]){
            return [];
        }
        return this.data[collectionName].filter(item =>
            Object.keys(where).every(key => 
                item[key] === where[key])
        );
    }

    remove(collectionName, findFunc) {
        if (!this.data[collectionName]){ 
            return [];
        }
        let removedItems = [];
        this.data[collectionName] = this.data[collectionName].filter(item => {
            if (!findFunc(item)) {
                removedItems.push(item);
            }
        });
        return removedItems;
    }
}

export class InMemorySharedStorage {
    static sharedData = {};
  
    create(collectionName, item) {
        if (!InMemorySharedStorage.sharedData[collectionName]) {
            InMemorySharedStorage.sharedData[collectionName] = [];
        }
        const newItem = {_id: uuidv4(), ...item };
        InMemorySharedStorage.sharedData[collectionName].push(newItem);
        return newItem;
    }
  
    find(collectionName, findFunc) {
        if (!InMemorySharedStorage.sharedData[collectionName]){
            return [];
        }
        return InMemorySharedStorage.sharedData[collectionName].filter(findFunc);
    }
  
    where(collectionName, whereObj) {
        if (!InMemorySharedStorage.sharedData[collectionName]){
            return [];
        }
        return InMemorySharedStorage.sharedData[collectionName].filter(item =>
            Object.keys(where).every(key => 
                item[key] === where[key])
        );
    }
  
    remove(collectionName, findFunc) {
        if (!InMemorySharedStorage.sharedData[collectionName]){ 
            return [];
        }
        let removedItems = [];
        InMemorySharedStorage.sharedData[collectionName] = InMemorySharedStorage.sharedData[collectionName].filter(item => {
            if (!findFunc(item)) {
                removedItems.push(item);
            }
        });
        return removedItems;
    }
}