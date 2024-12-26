import { PostRepository } from "../repository/posts.repository";
import { PostService } from "../services/post.service";


export class DIContainer {
    static createPostService(): PostService {
        const postRepository: PostRepository = new PostRepository();
        return new PostService(postRepository);
    }
}
