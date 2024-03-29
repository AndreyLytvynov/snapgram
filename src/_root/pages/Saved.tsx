import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

import Loader from "@/components/shared/Loader";
import PostList from "@/components/shared/PostList";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );

  return (
    <div className='saved-container'>
      <div className='flex gap-2 w-full max-w-5xl'>
        <img
          src='/assets/icons/save.svg'
          width={36}
          height={36}
          alt='edit'
          className='invert-white'
        />
        <h2 className='h3-bold md:h2-bold text-left w-full'>Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className='w-full flex justify-center max-w-5xl gap-9'>
          {savePosts.length === 0 ? (
            <p className='text-light-4'>No available posts</p>
          ) : (
            <PostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
