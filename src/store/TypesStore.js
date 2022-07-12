import { makeAutoObservable } from 'mobx';

export default class TypesStore {
  constructor() {
    this._types = [];
    makeAutoObservable(this);
  }

  get types() {
    return this._types;
  }

  setTypes(types) {
    this._types = types;
  }

  addType(type) {
    this._types.push(type);
  }

  deleteType(type) {
    this._types = this._types.filter(({ id }) => id !== Number(type));
  }
}
