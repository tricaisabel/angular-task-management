export default class User {
  constructor(
    public id: string,
    public username: string,
    public role: string,
    public email: string,
    public avatarId: string,
    private _token: string,
    private _expireDate: Date
  ) {}

  get token() {
    if (this._token === '' || this._expireDate < new Date()) {
      return 'none';
    }
    return this._token;
  }

  get expireDate() {
    if (this._expireDate < new Date()) {
      return 'none';
    }
    return this._expireDate;
  }
}
