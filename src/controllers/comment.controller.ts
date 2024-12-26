import { Request, Response, NextFunction } from "express";
import { CommentService } from "../services/comment.service";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { ReqValidationError } from "../errors/reqValidation.error";
import { NotFoundError } from "../errors/notFound.error";
import { plainToInstance } from "class-transformer";
import { CommentDisplayDTO } from "../interfaces/DTO/viewPost.dto";

export class CommentController{
    constructor(private commentService: CommentService){}

    async getComments(req: Request, res: Response): Promise<void>{
            const comments = await this.commentService.getComments(req.params.id)
            if (comments === null){
                res.status(200).json( {message: "The post has no comments to be displayed."})
            }        
            const displaycomments = plainToInstance(CommentDisplayDTO, comments, {excludeExtraneousValues: true})     
            res.status(200).json({data: {commentData: displaycomments, totalComments: comments?.length}, message: `Comments for post ${req.params.id} retrieved successfully.`})
    }

    async postComment(req: Request, res: Response) : Promise<void>{
            const postId = req.params.id;
            const userId = req.user?.id;
            const text = req.body.comment;
            if (!userId){
                throw new UnauthorizedError("Only logged in users can make comments.")
            }
            const comment = await this.commentService.postComment(postId, userId,text);
            res.status(201).json({data: comment, message: `Comment successfully posted on post ${postId}`})
    }

    async deleteComment(req: Request, res:Response):Promise<void>{
            const commentId = req.params.commentId;
            const comment = await this.commentService.getComment(commentId)
            if (comment === null){
                throw new NotFoundError("Cannot find the comment.")
            }
            if (req.user?.role === 'user'){           
              if (comment?.user.id !== req.user?.id){
                throw new UnauthorizedError("This is not your comment.")
              }
        }
            const success = await this.commentService.deleteComment(commentId);
            if (success.affected  === 0){
                throw new ReqValidationError("Not a valid request for deletion. Refresh")
            } 
        res.status(200).json({success: 'true', message: "Comment deleted successfully."})
    }

    async editComment(req: Request, res:Response):Promise<void>{
            const commentId = req.params.commentId
            const content = req.body.comment
            const comment = await this.commentService.getComment(commentId)
            if (comment === null){
                throw new NotFoundError("Cannot find the comment.")
            }
            if (comment?.user.id !== req.user?.id){
                  throw new UnauthorizedError("This is not your comment.")
            }
            const editedComment = await this.commentService.editComment(commentId, content);
            if (editedComment === null){
                throw new ReqValidationError("Couldn't edit the comment")
            }
            res.json({success:"true", data: editedComment, message: "Comment edited successfully."})
    }
};