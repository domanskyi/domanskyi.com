import { BlogPosts } from "app/components/blogPosts";
import { getDevToPosts } from "app/lib/utils/devTo";
import { getBlogPosts } from "app/lib/utils/mdx";
import { Contacts } from "./components/contacts";
import { Socials } from "./components/socials";
import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

export default async function Page() {
  const blogPosts = getBlogPosts(5);
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
      <Link
        href="/blog"
        className="flex items-center flex-row justify-start text-neutral-600 hover:text-neutral-800 transition-all gap-0 hover:gap-0.5"
      >
        <h2>Blog</h2>
        <div>
          <CaretRightIcon size={16} width="light" />
        </div>
      </Link>
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
