import { Account, Client, ID } from 'appwrite';
import config from '../config/config';



export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                //call login
                console.log("Account created: ",userAccount);
                console.log("Email & password: ",email, password);
                
               return login(email,password);


            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
            
        }
    }


    async login({email,password}){
        return await this.account.createEmailPasswordSession(email,password);
    }

    async getJWT(){
        return await this.account.createJWT();
    }

    async getCurrentUser(){

        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

       
    }

    async logout(){

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("error: ",error);
            
        }

        
      
    }

}

const authService = new AuthService();

export default authService;