import { BlogPosts } from "app/components/blogPosts";
import { getDevToPosts } from "./utils";
import { getBlogPosts } from "./blog/utils";
import { Contacts } from "./components/contacts";
import { Socials } from "./components/socials";
import Link from "next/link";

export default async function Page() {
  const blogPosts = getBlogPosts();
  const devToPosts = await getDevToPosts();

  return (
    <section>
      <div className="flex flex-row items-center justify-between mb-2">
        <h1 className="font-semibold tracking-tighter">Valentyn Domanskyi</h1>
        <Socials />
      </div>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        software engineer, learner and adventurer
      </p>
      <div className="flex sm:flex-row flex-col items-start justify-between mb-4">
        <Contacts />
      </div>
      <div className="w-full h-[.0625rem] bg-neutral-200 mb-8" />
      <h2 className="text-neutral-600">Articles</h2>
      <div className="my-4">
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
      <div className="w-full h-[.0625rem] bg-neutral-200 mb-8" />
      <h2 className="text-neutral-600">Blog</h2>
      <div className="my-4">
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
      </div>
      <div className="w-full h-[.0625rem] bg-neutral-200 mb-8" />
    </section>
  );
}
