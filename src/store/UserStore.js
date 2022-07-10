import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._id = undefined;
    this._login = undefined;
    this._role = 'guest';
    this._artists = [];
    this._marks = [];
    makeAutoObservable(this);
  }

  setIsAuth() {
    this._isAuth = !this._isAuth;
  }

  setInfo({ id, login, role }) {
    this._id = id;
    this._login = login;
    this._role = role;
  }

  setArtists(artists) {
    this._artists = artists;
  }

  addArtist(artist) {
    this._artists.push(artist);
  }

  updateArtist(artist) {
    this._artists = this._artists.map((a) => (artist.id === a.id ? artist : a));
  }

  deleteArtist(artist) {
    this._artists = this._artists.filter(({ id }) => Number(artist.id) !== id);
  }

  clear() {
    this._isAuth = false;
    this._id = undefined;
    this._login = undefined;
    this._role = 'guest';
    this._artists = [];
  }

  get isAuth() {
    return this._isAuth;
  }

  get id() {
    return this._id;
  }

  get login() {
    return this._login;
  }

  get role() {
    return this._role;
  }

  get artists() {
    return this._artists;
  }
}
