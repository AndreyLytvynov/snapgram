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
      <PostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
