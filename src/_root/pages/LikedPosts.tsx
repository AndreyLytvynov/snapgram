import Loader from "@/components/shared/Loader";
import PostList from "@/components/shared/PostList";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className='text-light-4'>No liked posts</p>
      )}

      <PostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
