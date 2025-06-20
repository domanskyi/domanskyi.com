import { BlogPosts } from "app/components/posts";
import { getDevToPosts } from "./utils";
import { getBlogPosts } from "./blog/utils";
import { Icon } from "./components/icon";

export default async function Page() {
  const blogPosts = getBlogPosts();
  const devToPosts = await getDevToPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
        Valentyn Domanskyi
      </h1>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        software engineer, learner and adventurer
      </p>
      <div className="mb-8">
        <span className="flex items-center text-sm gap-1 mb-2">
          <Icon name="location" className="size-5" />
          Krakow, Poland
        </span>
        <a
          href="https://s-pro.io/"
          target="_blank"
          className="flex items-center text-sm gap-1"
        >
          <Icon name="company" className="size-5" />
          S-PRO
        </a>
      </div>
      <h2 className="font-bold">Articles</h2>
      <div className="my-4 mb-8">
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
        <h2 className="font-bold">Blog</h2>
        <div className="my-4 mb-8">
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
        <p className="mb-4">
          Sometimes I write my thoughts in{" "}
          <a
            href="https://t.me/newoldonesincerity"
            target="_blank"
            className="underline"
          >
            🇺🇦 telegram channel
          </a>
        </p>
      </div>
    </section>
  );
}
