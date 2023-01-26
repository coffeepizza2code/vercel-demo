import useSWR from "swr";
import fetcher from "../utils/fetcher";
import removeHTMLtag from "../utils/normalizeStr";
import { Rings } from "react-loader-spinner";

function Secure() {
  const { data, isLoading, error } = useSWR("/api/secure", fetcher);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-9">
      {(() => {
        if (error) return <span className="">Failed to load the data</span>;
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
          (item: { id: number; title: { rendered: string }; link: string }) => {
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
    </div>
  );
}

export default Secure;
