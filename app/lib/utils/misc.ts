export const cn = (...classes) => classes.filter(Boolean).join(" ");

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

export const transliterate = (str: string) => {
  const map = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "H",
    Ґ: "G",
    Д: "D",
    Е: "E",
    Є: "Ye",
    Ж: "Zh",
    З: "Z",
    И: "Y",
    І: "I",
    Ї: "Yi",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ь: "",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
  };

  return str
    .split("")
    .map((char) => map[char] || char)
    .join("");
};
