export interface Post{
    id: string;
    author:{
        name:string,
        avatar:string
    };
    content: string;
    image?: string
}
export interface FetchResponse{
    data: Post[];
    nextCursor: string | null
}