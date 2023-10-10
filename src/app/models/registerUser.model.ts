export class RegisterUser {
    private username: String;
    private email:String;
    private password:String;
    private dateOfBirth: String;

    constructor(username:String, email:String, password:String, dateOfBirth:String) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }

    get getUsername(): String {
        return this.username;
    }
    
    set setUsername(value: String) {
        this.username = value;
    }

    get getEmail() : String {
        return this.email;
    }

    set setEmail(value: String) {
        this.email = value;
    }

    get getPassword() : String {
        return this.password;
    }

    set setPassword(value: String) {
        this.password = value;
    }

    get getDateOfBirth() : String {
        return this.dateOfBirth;
    }

    set setDateOfBirth(value: String) {
        this.dateOfBirth = value;
    }
}
