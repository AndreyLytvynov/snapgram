import { Models } from "appwrite";

import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

import PostCard from "@/components/shared/PostCard";

import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";

const Home = () => {
  const { data: posts, isLoading: isPostLoading } = useGetRecentPosts();

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          <ul className='flex flex-col flex-1 gap-9 w-full'>
            {isPostLoading || !posts
              ? Array(9)
                  .fill(0)
                  .map((_, i) => {
                    return <PostCardSkeleton key={i} />;
                  })
              : posts?.documents.map((post: Models.Document) => {
                  return (
                    <li key={post.$id} className='flex justify-center w-full'>
                      <PostCard post={post} />
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
