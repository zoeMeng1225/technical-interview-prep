import {useState, useEffect, useCallback, useRef} from 'react';
import {Post, FetchResponse} from "./types";

//simulate API request
const mockFetch = async(cursor: string | null): Promise<FetchResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) //simulate network delay
    return {
        data: Array.from({ length:5}).map((_, i) => ({
        id:Math.random().toString(36).substr(2,9),
        author:{name: 'User', avatar: 'https://via.placeholder.com/50'},
        content: `Post content loaded at ${new Date().toLocaleTimeString()}`,
        })),
        nextCursor:Math.random().toString() //simulate next cursor
    };
};

export const useInfiniteLoader = () => {
    const [items, setItems] = useState<Post[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = useCallback(async() => {
        if(isLoading || !hasMore) return ;

        setIsLoading(true);
        try{
            const res = await mockFetch(cursor);
            setItems(prev => [...prev, ...res.data]);
            setCursor(res.nextCursor);
            if(!res.nextCursor) setHasMore(false)
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    },[cursor, isLoading, hasMore]);

    //Initial loading
    useEffect(() => {
        loadMore();
    },[])

    return {items, isLoading, loadMore, hasMore}
}