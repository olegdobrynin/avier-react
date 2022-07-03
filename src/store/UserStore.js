import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._info = [];
    this._artists = [];
    makeAutoObservable(this);
  }

  setIsAuth() {
    this._isAuth = !this._isAuth;
  }

  setInfo(info) {
    this._info = info;
  }

  setArtists(artists) {
    this._artists = artists;
  }

  addArtist(artist) {
    this._artists.push(artist);
  }

  updateArtist(artist) {
    this._artists = this.artists.map((a) => Number(artist.id) === a.id ? artist : a);
  }

  deleteArtist(artist) {
    this._artists = this._artists.filter(({ id }) => Number(artist.id) !== id);
  }

  clear() {
    this._isAuth = false;
    this._info = [];
    this._artists = [];
  }

  get isAuth() {
    return this._isAuth;
  }

  get info() {
    return this._info;
  }

  get artists() {
    return this._artists;
  }
}
