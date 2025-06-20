import Link from "next/link";
import { formatDate } from "app/blog/utils";
import { FC } from "react";
import { SvgIcon } from "./svgIcon";

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
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center">
                  {post.title}
                  {post.external && (
                    <SvgIcon
                      name="externalUrl"
                      className="ml-2 transition-all text-neutral-600 hover:text-neutral-800"
                    />
                  )}
                </p>
                <span className="text-neutral-400 text-sm">
                  {post.tags.join(", ")}
                </span>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums flex items-center gap-1 text-nowrap">
                {formatDate(new Date(post.publishedAt), false)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export { BlogPosts };
