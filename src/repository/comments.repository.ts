import { AppDataSource } from "../config/db.config";
import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";

export class CommentRepository{
    private commentRepository: Repository<Comment>;
    constructor(){
        this.commentRepository = AppDataSource.getRepository(Comment);
    };

    async getComments(id: string){
        const comments = await this.commentRepository.find({where: {post: {id: id}}, relations: ['post']})
        return comments
    }   

    async postComment(postId: any, userId: any, text: string){
        const comment = new Comment()
        comment.post = postId;
        comment.user = userId;
        comment.text = text;
        const commentData = await this.commentRepository.save(comment);
        return commentData
    }

    async getComment(id: any){
        return await this.commentRepository.findOne({where: {id}})
    }

    async deleteComment(id: string){
        return await this.commentRepository.delete(id)
    }       
    async editComment(id: any, content: string){
        const comment = await this.commentRepository.findOne({where: {id}})
        if(!comment){
            return null
        }
        comment.text = content
        return await this.commentRepository.save(comment)
    }
}
