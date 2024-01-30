import { useGetRecentInfinitePosts } from "@/lib/react-query/queriesAndMutations";

import PostCard from "@/components/shared/PostCard";

import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";

const Home = () => {
  const { ref, inView } = useInView();
  const {
    isPending,
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = useGetRecentInfinitePosts();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          <ul className='flex flex-col flex-1 gap-9 w-full'>
            {isPending || !posts
              ? Array(9)
                  .fill(0)
                  .map((_, i) => {
                    return <PostCardSkeleton key={i} />;
                  })
              : posts?.pages.map((page) =>
                  page?.documents.map((post) => (
                    <li key={post.$id} className='flex justify-center w-full'>
                      <PostCard post={post} />
                    </li>
                  ))
                )}
          </ul>
          {hasNextPage && (
            <div ref={ref} className='mt-10'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
