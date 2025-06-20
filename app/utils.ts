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
