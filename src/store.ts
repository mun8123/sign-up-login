/* eslint-disable no-underscore-dangle */
class Store {
  private _token;

  private _userProfile;

  constructor() {
    this._token = '';
    this._userProfile = {};
  }

  set token(token) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  set userProfile(userProfile: object) {
    this._userProfile = userProfile;
  }

  get userProfile() {
    return this._userProfile;
  }
}

export default Store;
