import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/userContext";

const AllUsers = () => {
  const { toast } = useToast();

  const { user: currentUser } = useUserContext();
  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className='common-container'>
      <div className='user-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Users</h2>
        {isPending || (!creators && !currentUser) ? (
          <Loader />
        ) : (
          <ul className='user-grid'>
            {creators?.documents.map((creator) => {
              if (creator?.$id === currentUser.id)
                return <li key={creator?.$id}></li>;
              return (
                <li
                  key={creator?.$id}
                  className='flex-1 min-w-[200px] w-full  '
                >
                  <UserCard user={creator} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
