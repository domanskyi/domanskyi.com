"use client";

import Link from "next/link";
import { EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react";

const Contacts = () => {
  return (
    <div>
      <span className="flex items-center text-sm gap-1 mb-2">
        <MapPinIcon size={24} weight="light" />
        Krakow, Poland
      </span>
      <Link
        href="mailto:mail@valentyndomanskyi.com"
        className="flex items-center text-sm gap-1 mb-2"
        target="_blank"
      >
        <EnvelopeSimpleIcon size={24} weight="light" />
        mail@valentyndomanskyi.com
      </Link>
    </div>
  );
};

export { Contacts };
