import Head from "next/head";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { Rings } from "react-loader-spinner";
import removeHTMLtag from "../utils/normalizeStr";

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://danielcodex.com/wp-json/wp/v2/posts",
    fetcher
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen flex flex-col justify-center items-center gap-9">
        {(() => {
          if (error) return <h1>failed to load</h1>;
          if (isLoading) {
            return (
              <Rings
                height="80"
                width="80"
                color="#2563eb"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            );
          }
          return data.map(
            (item: {
              title: { rendered: string };
              id: number;
              link: string;
            }) => {
              return (
                <div key={item.id}>
                  <a
                    href={item.link}
                    className="text-blue-600 underline visited:text-red-400"
                  >
                    {removeHTMLtag(item.title.rendered)}
                  </a>
                </div>
              );
            }
          );
        })()}
      </main>
    </>
  );
}
