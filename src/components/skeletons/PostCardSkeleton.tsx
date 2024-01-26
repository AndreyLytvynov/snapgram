import ContentLoader from "react-content-loader";

const PostCardSkeleton = () => {
  return (
    <li className='bg-dark-2 rounded-3xl border border-dark-4 w-full'>
      <ContentLoader
        speed={2}
        width={640}
        height={820}
        viewBox='0 0 640 820'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebebe0'
        gradientRatio={3}
        className='w-full h-full'
      >
        <circle cx='55' cy='55' r='25' />
        <rect x='90' y='30' rx='3' ry='3' width='120' height='20' />
        <rect x='90' y='65' rx='3' ry='3' width='160' height='10' />
        <rect x='28' y='100' rx='3' ry='3' width='150' height='15' />
        <rect x='28' y='135' rx='3' ry='3' width='100' height='10' />
        <rect x='28' y='168' rx='24' ry='24' width='583' height='585' />
        <rect x='28' y='780' rx='10' ry='10' width='20' height='20' />
        <rect x='590' y='780' rx='10' ry='10' width='20' height='20' />
      </ContentLoader>
    </li>
  );
};

export default PostCardSkeleton;
