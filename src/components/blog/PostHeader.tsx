import Link from 'next/link';

import Post from '~/core/blog/types/post';
import If from '~/core/ui/If';
import Author from '~/components/blog/Author';

import DateFormatter from './DateFormatter';
import CoverImage from './CoverImage';
import CollectionTag from './CollectionTag';
import Tag from './Tag';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';

type Props = {
  post: Post;
};

const PostHeader = ({ post }: Props) => {
  const { title, date, readingTime, collection, excerpt } = post;

  const coverImage = 'coverImage' in post ? post.coverImage : '';
  const tags = post.tags ?? [];

  // NB: change this to display the post's image
  const displayImage = true;
  const preloadImage = true;

  return (
    <>
      <div className={'flex flex-col space-y-2 my-8'}>
        <Heading type={1}>{title}</Heading>

        <SubHeading>{excerpt}</SubHeading>
      </div>

      <div className="mx-auto mb-4 mt-4 flex">
        <div className="flex flex-row items-center space-x-2 text-sm text-gray-600 dark:text-gray-200">
          <If condition={post.author}>
            {(author) => <Author author={author} />}
          </If>

          <div>
            <DateFormatter dateString={date} />
          </div>

          <span>·</span>
          <span>{readingTime}</span>

          <If condition={tags.length}>
            <div className={'hidden items-center space-x-2 sm:flex'}>
              <span>·</span>

              <div className={'flex justify-start space-x-2'}>
                <PostTags tags={tags} collection={collection.name} />
              </div>
            </div>
          </If>
        </div>
      </div>

      <If condition={displayImage && coverImage}>
        <div className="relative mx-auto h-[350px] w-full justify-center">
          <CoverImage
            preloadImage={preloadImage}
            className="rounded-md"
            title={title}
            src={coverImage}
          />
        </div>
      </If>
    </>
  );
};

function PostTags({
  tags,
  collection,
}: {
  tags: string[];
  collection: string;
}) {
  return (
    <>
      {tags
        .filter((tag) => {
          // exclude collections with the same name as the tag
          return tag.toLowerCase() !== collection.toLowerCase();
        })
        .map((tag) => {
          const hrefAs = `/blog/tags/${tag}`;
          const href = `/blog/tags/[tag]`;

          return (
            <Link key={tag} href={href} as={hrefAs} passHref>
              <Tag>{tag}</Tag>
            </Link>
          );
        })}
    </>
  );
}

export default PostHeader;
