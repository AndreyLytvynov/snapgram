import { Link, useParams } from "react-router-dom";

import {
  useCreateFollower,
  useDeleteFollower,
  useGetCurrentUser,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutations";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import PostList from "@/components/shared/PostList";
import LikedPosts from "./LikedPosts";
import StatBlock from "@/components/shared/StatBlock";
import { Models } from "appwrite";

const Profile = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetCurrentUser();
  const { data: currentUser } = useGetUserById(id || "");
  const { mutate: addFollower, isPending: isLoadingAddingFollower } =
    useCreateFollower();
  const { mutate: deleteFollower, isPending: isLoadingDeletingFollower } =
    useDeleteFollower();

  const alreadySubscribed = user?.follower
    .map(({ following }: Models.Document) => {
      return following.$id;
    })
    .includes(id);

  if (!currentUser || !user)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );

  const handleFollow = () => {
    if (alreadySubscribed) {
      deleteFollower({ followerId: user.$id, recipientId: currentUser.$id });
      return;
    }
    addFollower({ followerId: user.$id, recipientId: currentUser.$id });
  };

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt='profile'
            width={200}
            height={200}
            className='object-cover rounded-full'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full'>
              <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
                {currentUser.name}
              </h1>
              <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>
                @{currentUser.username}
              </p>
            </div>

            <div className='flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20'>
              <StatBlock value={currentUser.posts.length} label='Posts' />
              <StatBlock
                value={currentUser?.follows.length}
                label='Followers'
              />
              <StatBlock
                value={currentUser?.follower.length}
                label='Following'
              />
            </div>

            <p className='small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm'>
              {currentUser.bio}
            </p>
          </div>

          <div className='flex justify-center gap-4'>
            <div className={`${user.$id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-3 hover:bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.$id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt='edit'
                  width={20}
                  height={20}
                />
                <p className='flex whitespace-nowrap small-medium'>
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.$id === id && "hidden"}`}>
              <Button
                onClick={handleFollow}
                type='button'
                className='shad-button_primary px-8 w-[150px]'
              >
                {alreadySubscribed ? "Unfollow" : " Follow"}{" "}
                {isLoadingAddingFollower ||
                isLoadingDeletingFollower ||
                isPending ? (
                  <Loader />
                ) : (
                  ""
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {currentUser.$id === user.$id || alreadySubscribed ? (
        <Tabs defaultValue='posts' className='w-full'>
          <TabsList className='w-full mb-4'>
            <TabsTrigger value='posts' className='profile-tab rounded-l-lg'>
              <img
                src={"/assets/icons/posts.svg"}
                alt='posts'
                width={20}
                height={20}
              />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value='liked-posts'
              className='profile-tab rounded-r-lg'
            >
              <img
                src={"/assets/icons/like.svg"}
                alt='like'
                width={20}
                height={20}
              />
              Liked posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value='posts'>
            <PostList posts={currentUser.posts} showUser={false} />
          </TabsContent>
          <TabsContent value='liked-posts'>
            <LikedPosts />
          </TabsContent>
        </Tabs>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
