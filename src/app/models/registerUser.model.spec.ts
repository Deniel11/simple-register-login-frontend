import { RegisterUser } from './registerUser.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new RegisterUser("null", "null", "null", "null")).toBeTruthy();
  });
});
