import { addCount } from "../helpers/addCount";
import { PostRepository } from "../repository/posts.repository";
import { CreatePostDTO } from "../interfaces/DTO/createPost.dto";

export class PostService{

    constructor(private postRepository: PostRepository){
        this.postRepository = postRepository;
    }
    public async createPost(post: CreatePostDTO){
        const postData = await this.postRepository.createPost(post);
        return postData;
    }

    public async editPost(postId: string, title: string, content: string){
        const postData = await this.postRepository.editPost(postId, title, content)
        return postData
    }

    public async deletePost(postId: string){
        await this.postRepository.deletePost(postId);
        return { success:true}
    }

    public async viewPost(id: string){
        const data = await this.postRepository.viewPost(id);
        const postData = {...data, likesCount: data?.likes.length, commentsCount: data?.comments.length}
        return postData
    }

    public async getPost(id: string){
        return await this.postRepository.getPostById(id);
    }

    public async viewAllPosts(){
        const posts = await this.postRepository.viewAllPosts();
        const postData = addCount(posts);
        return postData;
    }

    public async viewUserAllPosts(id: string){
        const posts = await this.postRepository.viewUserAllPosts(id)
        const postData = addCount(posts);
        return postData
    }
};  