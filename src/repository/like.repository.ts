import { Repository } from "typeorm";
import { AppDataSource } from "../config/db.config";
import { PostLike } from "../entities/like.entity";

export class LikeRepository {
    private likeRepository: Repository<PostLike>;
    constructor(){
        this.likeRepository = AppDataSource.getRepository(PostLike);
    };

    async getLikes(postId: any){
        return this.likeRepository.find({relations: { post: true},where: {post: {id: postId}}})
    }

    async likePost(userId: any, postId:any){
        const likedPost = new PostLike()
        likedPost.post = postId;
        likedPost.user = userId;
        return await this.likeRepository.save(likedPost)
    }

    async removeLike(postId: any){
        return this.likeRepository.delete(postId)
    }

    async likeByPost(userId: any, postId: any){
        return this.likeRepository.findOne({ relations: {post: true, user:true}, where: {post: {id: postId}, user:{id: userId}}})
    }


}; 