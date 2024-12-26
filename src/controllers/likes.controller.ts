import { Request, Response, NextFunction } from "express";
import { PostLikeService } from "../services/like.service";
import { ReqValidationError } from "../errors/reqValidation.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { plainToInstance } from "class-transformer";
import { LikeDisplayDTO } from "../interfaces/DTO/viewPost.dto";

export class PostLikeController{
    constructor(private postLikeService: PostLikeService){}

    async getLikes(req:Request, res: Response):Promise<void>{
            const postId = req.params.postId;
            const likes = await this.postLikeService.getLikes(postId);
            const likeData = likes.map(like=>({
                user: like.user,
                createdAt: like.createdAt
            }));
            const displayLikes = plainToInstance(LikeDisplayDTO, likeData, {excludeExtraneousValues: true})
            res.status(200).json({data: {likes: displayLikes, totalLikes: likes.length}, message:`Successfully fetched all the likes for the post ${postId}`})
    }

    async likePost(req:Request, res:Response):Promise<void>{
            const postId = req.params.postId;
            const userId = req.user?.id;
            const success = await this.postLikeService.likePost(userId, postId);
            console.log(success)
            if (success === null){
                throw new ReqValidationError("You have already liked this post.")
            }
            res.status(200).json(`Liked post ${postId}`)
    }

    async removeLike(req: Request, res: Response):Promise<void>{
            const userId = req.user?.id
            const postId = req.params.postId
            if ( userId === undefined){
                throw new UnauthorizedError("Please login.")
            }
            const status = await this.postLikeService.removeLike(userId, postId);
            if (status === null){
                throw new ReqValidationError("You haven't liked the post to remove it.")
            }
            res.status(200).json({success: "true", message: "Like removed successfully."}) 
    }
}