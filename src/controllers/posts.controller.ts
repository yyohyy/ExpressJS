import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { Auth } from "../entities/auth.entity";
import { NotFoundError } from "../errors/notFound.error";
import { ReqValidationError } from "../errors/reqValidation.error";
import { ViewPostDTO } from "../interfaces/DTO/viewPost.dto";
import { plainToClass,  plainToInstance } from "class-transformer";
import { CreatePostDTO } from "../interfaces/DTO/createPost.dto";
import { validate } from "class-validator";
import { UnauthorizedError } from "../errors/unauthorized.error";

export class PostController{

    constructor(private postService: PostService){}

    async createPost(req: Request, res: Response):Promise<void>{
            const currentUser = req.user as Auth;
            const post = plainToClass(CreatePostDTO, {
                title: req.body.title,
                content: req.body.content,
                user: currentUser.id,
            });
            const errors = await validate(post);
            if (errors.length > 0) {
                res.status(400).json({
                    message: 'The provided values are not correct.',
                    errors: errors.map(error => ({
                        property: error.property,
                        constraints: error.constraints
                    }))
                });
            }
            const postData= await this.postService.createPost(post);
            res.status(201).json({ data: postData, message: 'Successfully created post'});
    }

    async viewPost(req: Request, res:Response):Promise<void>{
            const id = req.params.id;           
            const postData = await this.postService.viewPost(id);
            if (postData === null){
                throw new NotFoundError(`Post with ID: ${id} not found`)
            }
            const displayPostData = plainToClass(ViewPostDTO, postData, {excludeExtraneousValues: true})
            res.status(200).json({data: displayPostData, message: "This is the post"})
    }

    async editPost(req: Request, res:Response):Promise<void>{
            const postId = req.params.id;
            const title = req.body.title
            const content = req.body.content;
            if (content.length === 0){
                throw new ReqValidationError("The data provided is empty")
            } 
            const post = await this.postService.getPost(postId);
            if (post === null){
                throw new NotFoundError(`Cannot find post ${postId}`)
            }
            const userId = post?.user?.id;
            if(req.user?.id !== userId){
                throw new  UnauthorizedError("Unauthorized. Not the owner of the post.")         
            } 
            const postData = await this.postService.editPost(postId, title, content)
            res.status(200).json({data: postData, message: "Post successfully updated."})
    }
    
    async deletePost(req: Request, res:Response):Promise<void>{
            const currentUserId = req.user?.id
            const postId = req.params.id;
            const post = await this.postService.getPost(postId);
            console.log(post)
            if (post === null){
                throw new NotFoundError(`Cannot find post ${postId}`)
            }
            const userId = post?.user?.id;
            console.log(currentUserId, userId, req.user?.role)
            if(currentUserId !== userId && req.user?.role !== 'admin'){
                throw new  UnauthorizedError("Unauthorized. Not the owner of the post.")         
            }
            const data = await this.postService.deletePost(postId);
            res.status(200).json({message: "Post deleted successfully"})        
    }

    async viewAllPosts(req: Request, res: Response){
            const posts = await this.postService.viewAllPosts()
            const displayPostData = plainToInstance(ViewPostDTO, posts, {excludeExtraneousValues: true})
            res.status(200).json({data: displayPostData, message: "Successfully retrieved all the posts"});
    }

    async viewUserAllPosts( req: Request, res: Response, next: NextFunction){
            const id = req.params.id;
            const posts = await this.postService.viewUserAllPosts(id);
            res.status(200).json({data: posts, message: "Successfully retrieved all the posts of the user"})
    }
};




