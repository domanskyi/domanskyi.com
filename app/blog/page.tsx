import { BlogPosts } from "app/components/blogPosts";
import { getBlogPosts } from "./utils";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Blog",
  description: "short notes on everything I found useful and insightful",
};

export default function Page() {
  const blogPosts = getBlogPosts();

  return (
    <section>
      <div className="flex items-start justify-between">
        <h1 className="font-semibold mb-2 tracking-tighter">Blog</h1>
        <Link
          className="flex items-center transition-all text-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-100"
          rel="noopener noreferrer"
          target="_blank"
          href="/rss"
        >
          <p className="h-7">rss</p>
          <ArrowUpRightIcon size={20} weight="light" />
        </Link>
      </div>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        short notes on everything I found useful and insightful
      </p>
      <BlogPosts
        posts={blogPosts.map((post) => ({
          url: `/blog/${post.slug}`,
          title: post.metadata.title,
          publishedAt: post.metadata.publishedAt,
          language: post.metadata.language || "en",
          external: false,
          tags: post.metadata.tags || [],
        }))}
      />
    </section>
  );
}
