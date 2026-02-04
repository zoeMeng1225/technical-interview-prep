import React, {useRef, useCallback} from 'react';
import { useInfiniteLoader } from './useInfiniteLoader';

const NewsFeed:React.FC = () => {
    const {items, isLoading, loadMore, hasMore} = useInfiniteLoader();
    const observer = useRef<IntersectionObserver>();

    //ref callback of last element
    const lastElementRef = useCallback((node: HTMLDListElement) => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            //load if the last element is visible and there is more data;
            if(entries[0].isIntersecting && hasMore){
                loadMore()
            }
        });

        if(node) observer.current.observe(node); 
    },[isLoading, hasMore, loadMore])


return(
    <div classNames="feed-container" style={{maxWidth: '600px', margin:'0 auto'}}>
        <h1>New Feed</h1>
        {items.map((post, index) => {
            const isLastElement = items.length == index+1;
            return (
                <div
                    key={post.id}
                    ref={isLastElement?lastElementRef: null} //only listen to the last one
                    style={{border: '1px solid #ddd', padding:'16px', marginBottom:'16px', borderRedius:'8px'}}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <img src={post.author.avatar} alt="avatar" style={{ borderRadius: '50%', marginRight: '10px' }} />
                        <strong>{post.author.name}</strong>
                    </div>
                    <p>{post.content}</p>
                </div>
            )
        })}
        {isLoading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading more posts...</div>}
        {!hasMore && <div style={{ textAlign: 'center', padding: '20px' }}>You've reached the end!</div>}
    </div>
)
}

export default NewsFeed
