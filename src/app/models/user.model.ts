export default class User {
  constructor(
    public id: string,
    public username: string,
    public role: string,
    public email: string,
    private _token: string,
    private _expireDate: Date
  ) {}

  get token() {
    if (this._token === '' || this._expireDate < new Date()) {
      return 'none';
    }
    return this._token;
  }
}
