"use client";

import { SvgIcon } from "./svgIcon";

const Contacts = () => {
  return (
    <div className="mb-8">
      <span className="flex items-center text-sm gap-1 mb-2">
        <SvgIcon name="location" className="size-5" />
        Krakow, Poland
      </span>
      <a
        href="mailto:mail@valentyndomanskyi.com"
        className="flex items-center text-sm gap-1"
        target="_blank"
      >
        <SvgIcon name="mail" className="size-5" />
        mail@valentyndomanskyi.com
      </a>
    </div>
  );
};

export { Contacts };
