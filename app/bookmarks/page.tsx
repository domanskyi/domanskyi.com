import { CustomMDX } from "app/components/mdx";

export const metadata = {
  title: "Bookmarks",
  description: "different things I find interesting and insightful",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
        My Bookmarks
      </h1>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        different things I find interesting and insightful
      </p>
      <article className="prose">
        <CustomMDX
          source={`
          
          
Different things I find interesting and insightful.

This website mastermind: [Luke Smith](https://lukesmith.xyz/)

Articles and essays:

- [Six Principles for Making New Things](https://www.paulgraham.com/newthings.html) - Paul Graham
> I like to find (a) simple solutions (b) to overlooked problems (c) that actually need to be solved, and (d) deliver them as informally as possible, (e) starting with a very crude version 1, then (f) iterating rapidly.

Lists:
- [Dig Deeper](https://digdeeper.neocities.org/)
> Articles about Internet privacy and security. Contains lists of private software and services by different topics and with detailed explanations.
          
          `}
        />
      </article>
    </section>
  );
}
