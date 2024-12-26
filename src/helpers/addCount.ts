import { Post } from "../entities/post.entity";

export function addCount(posts: Post[]){
    const postData = posts.map(post=>({
        ...post,
        likesCount: post.likes.length || 0,
        commentsCount: post.comments.length || 0
    }));
    return postData;        
}





