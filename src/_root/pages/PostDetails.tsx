import { useParams, Link, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/userContext";
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";
import PostList from "@/components/shared/PostList";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className='post_details-container'>
      <div className='hidden md:flex max-w-5xl w-full'>
        <Button
          onClick={() => navigate(-1)}
          variant='ghost'
          className='shad-button_ghost'
        >
          <img
            src={"/assets/icons/back.svg"}
            alt='back'
            width={24}
            height={24}
          />
          <p className='small-medium lg:base-medium'>Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className='post_details-card'>
          <img
            src={post?.imageUrl}
            alt='creator'
            className='post_details-img'
          />

          <div className='post_details-info'>
            <div className='flex-between w-full'>
              <Link
                to={`/profile/${post?.creator.$id}`}
                className='flex items-center gap-3 w-[60%] xs:w-full xs:max-w-[70%]'
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt='creator'
                  className='w-8 h-8 lg:w-12 lg:h-12 rounded-full'
                />
                <div className='flex gap-1 flex-col w-full'>
                  <p className='base-medium lg:body-bold text-light-1'>
                    {post?.creator.name}
                  </p>
                  <div className='flex-start gap-2 text-light-3 '>
                    <p className='subtle-semibold lg:small-regular truncate'>
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className='subtle-semibold lg:small-regular truncate'>
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              {user.id === post?.creator.$id && (
                <div className='flex-center gap-4 flex-col xs:flex-row'>
                  <Link to={`/update-post/${post?.$id}`}>
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt='edit'
                      width={24}
                      height={24}
                      className='w-4 h-4 xs:w-6 xs:h-6'
                    />
                  </Link>

                  <Button
                    onClick={handleDeletePost}
                    variant='ghost'
                    className={`post_details-delete_btn`}
                  >
                    <img
                      src={"/assets/icons/delete.svg"}
                      alt='delete'
                      width={24}
                      height={24}
                      className='w-4 h-4 xs:w-6 xs:h-6'
                    />
                  </Button>
                </div>
              )}
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
              <p>{post?.caption}</p>
              <ul className='flex gap-1 mt-1 lg:mt-2'>
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className='text-light-3 small-regular'
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className='w-full max-w-5xl'>
        <hr className='border w-full border-dark-4/80' />

        <h3 className='body-bold md:h3-bold w-full my-10'>
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <PostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
