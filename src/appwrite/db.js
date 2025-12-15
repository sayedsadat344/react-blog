import {  Client, Databases, ID, Query, Storage } from 'appwrite';
import config from '../config/config';


export class DbService{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }


    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
            {
                title,content,featuredImage,userId,status
            });
        } catch (error) {
            throw error;
        }
    }


    async updatePost(slug,{title,content,featuredImage,status}){
        try {

            return await this.databases.updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{
                title,content,status,featuredImage
            });
            
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug);

            return true;
        } catch (error) {
            throw error;
        }
    }


    async getPostBySlug({slug}){
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug);
        } catch (error) {
            throw error;
        }
    }


    async getAllPostsByQuery(queries=[
        Query.equal("status","active")
    ]){
        try {

            return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,queries);

        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(){
        try {

            return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId);

        } catch (error) {
            throw error;
        }
    }


    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketId,ID.unique,file);
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteBucketId,fileId);
            return true;
        } catch (error) {
            throw error;
        }
    }


    async getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwriteBucketId,fileId);
    }

    async getFileById(fileId){
        try {
            return await this.bucket.getFile(config.appwriteBucketId,fileId);
        } catch (error) {
            throw error;
        }
    }
}


const dbService = new DbService();

export default dbService;

