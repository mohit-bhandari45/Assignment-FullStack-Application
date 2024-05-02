import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { postsRoute } from './utils/apiroutes';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // console.log("qeihgq2rgq2")
    let a = await fetch(postsRoute)
    let data = await a.json();
    const newPosts = data.posts
    setPosts(prevPosts => [...prevPosts, ...newPosts])
    setHasMore(newPosts.length > 0);
    setPage(page + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
      >
        <div className='justify-center flex flex-col items-center w-[100vw] gap-1 font-[Helvetica]'>
          {posts.map(post => (
            // <div className='justify-center items-center w-full font-[Helvetica]'>
              <div className='bg-[#55b2e7] w-full h-56 gap-2 flex flex-col justify-center items-start md:items-center md:px-0 px-5' key={post.id}>
                <h2 className='text-4xl font-bold'>{post.title}</h2>
                <h2 className='text-xl'>{post.tagline}</h2>
                <p>{post.body}</p>
              </div>
            // </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;
