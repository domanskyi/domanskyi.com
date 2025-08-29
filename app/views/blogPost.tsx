import { CustomMDX } from "app/components/customMDX";
import { formatDate } from "app/lib/utils/date";
import { baseUrl } from "app/lib/constants";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getBlogPostsBySeries, TBlogPost } from "app/lib/utils/mdx";
import { FC } from "react";
import { BlogPosts } from "app/components/blogPosts";

type TBlogPostProps = {
  post: TBlogPost;
};

const BlogPost: FC<TBlogPostProps> = ({ post }) => {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.description,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Valentyn Domanskyi",
            },
          }),
        }}
      />
      <div className="flex items-start justify-between">
        <h1 className="title text-xl font-semibold tracking-tighter">
          {post.metadata.title}
        </h1>
        <Link
          className="flex items-center transition-all text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-100"
          rel="noopener noreferrer"
          target="_blank"
          href="/rss"
        >
          <p className="h-7">rss</p>
          <ArrowUpRightIcon size={20} weight="light" />
        </Link>
      </div>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(new Date(post.metadata.publishedAt), true)}
        </p>
        <span className="text-neutral-400 text-sm">
          {post.metadata.tags?.join(", ")}
        </span>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      {post.metadata.series && (
        <div>
          <div className="w-full h-[.0625rem] bg-neutral-200 mt-8" />
          <h2 className="text-neutral-600 mt-4 mb-2">
            {post.metadata.series} series
          </h2>
          <BlogPosts
            posts={getBlogPostsBySeries(post.metadata.series)
              .filter(({ slug }) => slug !== post.slug)
              .map((post) => ({
                url: `/blog/${post.slug}`,
                title: post.metadata.title,
                publishedAt: post.metadata.publishedAt,
                language: post.metadata.language || "en",
                external: false,
                tags: post.metadata.tags || [],
              }))}
          />
        </div>
      )}
    </section>
  );
};

export { BlogPost };
