import fs from "fs";
import path from "path";

export type TMetadata = {
  title: string;
  publishedAt: string;
  description: string;
  image?: string;
  language?: string;
  tags?: string[];
  draft?: boolean;
  series?: string[];
};

export type TBlogPost = {
  metadata: TMetadata;
  slug: string;
  content: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<TMetadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    const trimmedKey = key.trim() as keyof TMetadata;
    if (trimmedKey === "tags") {
      metadata[trimmedKey] = value.split(",").map((tag) => tag.trim()) as any;
    } else if (trimmedKey === "series") {
      metadata[trimmedKey] = value.split(",").map((tag) => tag.trim()) as any;
    } else if (trimmedKey === "draft") {
      metadata[trimmedKey] = value.trim().toLowerCase() === "true";
    } else {
      metadata[trimmedKey] = value as any;
    }
  });

  return { metadata: metadata as TMetadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts(limit?: number) {
  const allPosts = getMDXData(path.join(process.cwd(), "app", "blog", "posts"))
    .filter((post) => !post.metadata.draft)
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    });

  if (!limit) {
    return allPosts;
  }

  return allPosts.slice(0, limit);
}

export function getBlogPostsBySeries(series: string[]) {
  const allPosts = getBlogPosts();

  return allPosts.filter(
    (post) =>
      post.metadata.series &&
      post.metadata.series.some((s) => series.includes(s))
  );
}
