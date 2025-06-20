import { BlogPosts } from "app/components/posts";
import { getDevToPosts } from "./utils";
import { getBlogPosts } from "./blog/utils";

export default async function Page() {
  const blogPosts = getBlogPosts();
  const devToPosts = await getDevToPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
        Valentyn Domanskyi
      </h1>
      <p className="mb-4">
        Software engineer, learner and adventurer. I adore nature, love horrors
        and history, and pretend that I know something about philosophy📚.
      </p>
      <p className="mb-4">
        Currently, I live in 🇺🇦Volodymyr → 🇺🇦Ternopil → 🇵🇱Krakow and build
        complex front-ends at Wise Engineering → S-PRO.
      </p>
      <p className="mb-4">
        Sometimes I write about engineering at dev.to and about my thoughts in
        🇺🇦 telegram channel. You can find my short notes on everything I found
        useful and insightful at /posts and my notes during dev learning at
        learning.
      </p>
      <h2>Blog</h2>
      <div className="my-8">
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
      </div>
      <h2>Articles</h2>
      <div className="my-8">
        <BlogPosts
          posts={devToPosts.map((post) => ({
            url: post.url,
            title: post.title,
            publishedAt: post.published_at,
            language: post.language,
            tags: post.tag_list,
            external: true,
          }))}
        />
      </div>
    </section>
  );
}
