import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { FC } from "react";

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
      {posts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.url}
            className="flex flex-col space-y-1 mb-4"
            href={post.url}
            target={post.external ? "_blank" : "_self"}
            rel={post.external ? "noopener noreferrer" : undefined}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 justify-between">
              <div>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.title}
                </p>
                <span className="text-neutral-400 text-sm">
                  {post.tags.join(", ")}
                </span>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums flex items-center gap-1">
                {formatDate(new Date(post.publishedAt), false)}
                <span className="text-sm">{languageMarker[post.language]}</span>
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export { BlogPosts };
