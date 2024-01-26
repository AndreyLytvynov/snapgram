import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Followers = () => {
  const { data, isPending } = useGetCurrentUser();

  const follow = data?.follower.map(({ following }: Models.Document) => {
    return following;
  });

  return (
    <div className='common-container'>
      <div className='user-container'>
        <div className='flex gap-2 w-full max-w-5xl'>
          <img
            src='/assets/icons/followers.svg'
            width={36}
            height={36}
            alt='edit'
            className='invert-white'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>followings</h2>
        </div>
        {isPending ? (
          <Loader />
        ) : follow.length === 0 ? (
          <p className='text-light-4'>No followings</p>
        ) : (
          <ul className='user-grid'>
            {follow?.map((creator: Models.Document) => (
              <li key={creator?.$id} className='flex-1 min-w-[200px] w-full  '>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Followers;
