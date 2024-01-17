import { Models } from "appwrite";
import Loader from "./Loader";
import PostList from "./PostList";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document> | undefined;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <PostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
    );
  }
};

export default SearchResults;
