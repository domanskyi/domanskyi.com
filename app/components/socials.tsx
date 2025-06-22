"use client";

import useOnClickOutside from "app/lib/hooks/useOnClickOutside";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CaretDownIcon,
  GithubLogoIcon,
  GoodreadsLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  PencilSimpleIcon,
  TelegramLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import { cx } from "app/utils";

const mainSocials = [
  {
    url: "https://www.linkedin.com/in/v-domanskyi/",
    icon: <LinkedinLogoIcon size={24} className="inline" weight="light" />,
  },
  {
    url: "https://github.com/domanskyi",
    icon: <GithubLogoIcon size={24} className="inline" weight="light" />,
  },
];

const socials = [
  {
    title: "Instagram",
    url: "https://www.instagram.com/domanskyi_v/",
    icon: <InstagramLogoIcon size={24} className="inline" weight="light" />,
  },
  {
    title: "Twitter",
    url: "https://twitter.com/_domanskyi",
    icon: <TwitterLogoIcon size={24} className="inline" weight="light" />,
  },
  {
    title: "Goodreads",
    url: "https://www.goodreads.com/user/show/87156049-valentyn-domanskyi",
    icon: <GoodreadsLogoIcon size={24} className="inline" weight="light" />,
  },
  // {
  //   title: "Steam",
  //   url: "https://steamcommunity.com/id/domanskyi/",
  //   icon: <SteamLogoIcon size={24} className="inline" weight="light" />,
  // },
  {
    title: "Telegram",
    url: "https://t.me/domanskyi",
    icon: <TelegramLogoIcon size={24} weight="light" />,
  },
  {
    title: "Tg Channel",
    url: "https://t.me/newoldonesincerity",
    icon: <PencilSimpleIcon size={24} weight="light" />,
  },
];

const Socials = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setDrawerOpened(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      setDrawerOpened(false);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {mainSocials.map((social, index) => (
        <Link href={social.url} key={index} target="_blank">
          {social.icon}
        </Link>
      ))}
      <div
        ref={ref}
        className="relative w-max"
        onMouseEnter={() => setDrawerOpened(true)}
        onMouseLeave={() => setDrawerOpened(false)}
        onClick={() => setDrawerOpened(true)}
      >
        <span className="text-sm h-[1.25rem] flex items-center gap-1 cursor-pointer mt-[.25rem] ml-[-0.250rem]">
          <CaretDownIcon
            size={24}
            className={cx(
              "inline transition-all",
              drawerOpened ? "transform rotate-180" : ""
            )}
            weight="light"
          />
        </span>
        {drawerOpened && (
          <div className="absolute right-0 top-6  flex flex-col gap-0.5 py-2 bg-white border border-neutral-100 rounded-xs shadow-lg z-10">
            {socials.map((social) => (
              <Link
                href={social.url}
                key={social.title}
                target="_blank"
                className="py-1 px-2 w-[9.375rem] flex flex-row items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors text-sm"
              >
                {social.icon}
                {social.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Socials };
