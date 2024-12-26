import { PostLike } from "../entities/like.entity";
import { LikeRepository } from "../repository/like.repository";

export class PostLikeService{
    constructor(private likeRepository: LikeRepository){
        this.likeRepository = likeRepository;
    }

    public async getLikes(postId: any){
        const likes = await this.likeRepository.getLikes(postId);
        return likes
    }

    public async likePost(userId:any, postId:string){
        const likeCheck = await this.likeRepository.likeByPost(userId, postId)
        console.log(likeCheck)
        if (likeCheck !== null){
            return null
        }
        const status = await this.likeRepository.likePost(userId,postId);
        return status
    }    

    public async removeLike(userId: string, postId: string){
        console.log(userId, postId)
        const like = await this.likeRepository.likeByPost(userId, postId);
        if (like === null){
            return null
        }
        const status = await this.likeRepository.removeLike(like.id);
        return status
    }
};