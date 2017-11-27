export class User {
  name: {
    familyName: string;
    givenName: string;
  };
  email: string;
  photo?: string;
  github?: object;
  facebook?: object;
  twitter?: object;
  _id?: string;

  constructor (familyName: string, givenName: string, email: string) {
    this.name = {
      familyName: familyName,
      givenName: givenName
    };
    this.email = email;
  }

  setId (_id: string) {
    this._id = _id;
  }
  setGithub (provider: object) {
    this.github = provider;
  }
  setFacebook (provider: object) {
    this.facebook = provider;
  }
  setTwitter (provider: object) {
    this.twitter = provider;
  }
}
