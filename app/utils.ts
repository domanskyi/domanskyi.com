type TDevToPost = {
  id: string;
  title: string;
  description: string;
  url: string;
  published_at: string;
  language: string;
  tag_list: string[];
};

export const getDevToPosts = async (): Promise<TDevToPost[]> => {
  return await (
    await fetch("https://dev.to/api/articles?username=domanskyi")
  ).json();
};

export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const getHtmlHeadElements = () => {
  return [
    {
      tag: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
    },
    {
      tag: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
    },
    {
      tag: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
    },
    {
      tag: "link",
      attributes: {
        rel: "manifest",
        href: "/favicon/site.webmanifest",
      },
    },
    {
      tag: "link",
      attributes: {
        rel: "rel",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon/android-chrome-192x192.png",
      },
    },
    {
      tag: "link",
      attributes: {
        rel: "rel",
        type: "image/png",
        sizes: "512x512",
        href: "/favicon/android-chrome-512x512.png",
      },
    },
    {
      tag: "link",
      attributes: {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/favicon/favicon.ico",
      },
    },
    {
      tag: "meta",
      attributes: {
        name: "theme-color",
        content: "#ffffff",
      },
    },
  ];
};
