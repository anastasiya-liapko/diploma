export class Auth {
  public email: string;
  public password: string;

  constructor() {
    this.email = '';
    this.password = ''
  }

  get isValid(): boolean {
    return !!this.email && !!this.password;
  }
}