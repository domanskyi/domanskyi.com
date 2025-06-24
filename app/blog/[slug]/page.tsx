import { notFound } from "next/navigation";
import { getBlogPosts } from "app/blog/utils";
import { BlogPost } from "app/views/blogPost";
import { baseUrl } from "app/lib/constants";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, description, image } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    keywords: post.metadata.tags,
    authors: [
      {
        name: "Valentyn Domanskyi",
        url: "https://www.valentyndomanskyi.com/",
      },
    ],
    creator: "Valentyn Domanskyi",
    publisher: "Valentyn Domanskyi",
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
