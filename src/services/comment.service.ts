import { Comment } from "../entities/comment.entity";
import { CommentDisplayDTO } from "../interfaces/DTO/viewPost.dto";
import { CommentRepository } from "../repository/comments.repository";

export class CommentService{
    constructor(private commentRepository: CommentRepository){
        this.commentRepository = commentRepository;
    }

    public async getComments(id: string): Promise<any|null>{
        const comments = await this.commentRepository.getComments(id)
        const commentData = comments?.map(comment=>({
            text: comment.text,
            user: comment.user,
            createdAt: comment.createdAt
        }));
        return commentData
    }

    public async postComment(postId: string,userId: string, text: string): Promise<Comment |null>{
        const comment = await this.commentRepository.postComment(postId, userId, text);
        return comment
    }

    public async getComment(commentId: any): Promise<Comment |null>{
        const comment = await this.commentRepository.getComment(commentId);
        return comment
    }

    public async deleteComment(commentId: string){
        const success = await this.commentRepository.deleteComment(commentId);
        return success
    }

    public async editComment(id: string, content:string){
        const editedComment = await this.commentRepository.editComment(id, content);
        return editedComment
    }
}