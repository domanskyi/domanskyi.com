import { BlogPosts } from "app/components/posts";
import { getBlogPosts } from "./utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const blogPosts = getBlogPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">My Blog</h1>
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
          tags: [],
        }))}
      />
    </section>
  );
}
