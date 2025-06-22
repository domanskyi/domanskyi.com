import { YearProgress } from "./yearProgress";

export default function Footer() {
  return (
    <footer className="mb-16 mt-8 w-full bottom-0">
      <YearProgress />
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li></li>
      </ul>
    </footer>
  );
}
