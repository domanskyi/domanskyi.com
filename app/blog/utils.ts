import fs from "fs";
import path from "path";

export type TMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  language?: string;
  tags?: string[];
  draft?: boolean;
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
    } else if (trimmedKey === "draft") {
      metadata[trimmedKey] = value.trim().toLowerCase() === "true";
    } else {
      metadata[trimmedKey] = value as any;
    }
  });

  return { metadata: metadata as TMetadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
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

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts")).filter(
    (post) => !post.metadata.draft
  );
}
