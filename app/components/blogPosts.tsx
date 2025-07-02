import Link from "next/link";
import { formatDate } from "app/lib/utils/date";
import { FC } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type TBlogPostsProps = {
  posts: {
    url: string;
    title: string;
    publishedAt: string | Date;
    language: string;
    tags: string[];
    external: boolean;
  }[];
};

const languageMarker: Record<string, string> = {
  en: "🇬🇧",
  ua: "🇺🇦",
};

const BlogPosts: FC<TBlogPostsProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.url}
          className="flex flex-col space-y-1 mb-4 filter grayscale hover:grayscale-0 transition-all"
          href={post.url}
          target={post.external ? "_blank" : "_self"}
          rel={post.external ? "noopener noreferrer" : undefined}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 justify-between">
            <div>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
                {post.external && (
                  <ArrowUpRightIcon
                    size={20}
                    weight="light"
                    className="inline"
                  />
                )}
              </p>
              <span className="text-neutral-500 text-sm">
                {post.tags.join(", ")}
              </span>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 tabular-nums flex items-start gap-1 text-nowrap">
              {formatDate(new Date(post.publishedAt), false)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export { BlogPosts };
