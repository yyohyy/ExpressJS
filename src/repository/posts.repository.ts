import { AppDataSource } from "../config/db.config";
import { Repository } from "typeorm";
import { Post } from '../entities/post.entity';
import { CreatePostDTO } from "../interfaces/DTO/createPost.dto";

export class PostRepository{
    private postRepository: Repository<Post>;
    constructor(){
        this.postRepository = AppDataSource.getRepository(Post);
    };

    async viewPost(id: string){
        const postData = await this.postRepository.findOne({where: {id}})
        console.log(postData)
        return postData
    }

    async viewAllPosts(){
        const posts = await this.postRepository.find();
        return posts;
    }
    async viewUserAllPosts(id: string){
        const posts = await this.postRepository.find({where: {user: {id: id}}, relations: ['user']})
        return posts
    }   

    async createPost(post: any){
        const postData = await this.postRepository.save(post);
        return postData;
    }

    async editPost(id: string, title: string, content: string){
        const post = await this.postRepository.findOne({where: {id}})
        if(!post){
            return null
        }
        post.title = title
        post.content = content
        return await this.postRepository.save(post)
    }

    async getPostById(id: string){
        const post = await this.postRepository.findOne({where: {id}})
        return post
    }

    async deletePost(id: string){
        await this.postRepository.delete(id)
    }         
}

