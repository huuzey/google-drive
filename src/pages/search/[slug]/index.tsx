import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchsearch } from "~/hooks/fetchFiles";
import { AiFillFolder } from "react-icons/ai";
import { useRouter } from "next/router";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "~/firebaseConfig";

const Search = () => {
  const param = useSearchParams();
  const params = param.get("slug");
  const [load, setload] = useState(true);
  const [file, setfile] = useState<Arraytype>([]);
  const router = useRouter();
  let files = collection(database, "files");

  useEffect(() => {
    return onSnapshot(files, (response) => {
      setfile(
        response.docs
          .map((item) => {
            return { ...item.data(), id: item.id };
          })
          .filter(
            (item: any) =>
              item.name?.toLowerCase().includes(params?.toLowerCase()) ||
              item.folderName?.toLowerCase().includes(params?.toLowerCase()),
          ),
      );
      setload(false);
    });
  }, [params]);
  console.log("filesea", file);

  return (
    <div className="mt-3">
      {load && (
        <p className="ml-2 items-center justify-center text-lg text-cyan-500">
          Searching...
        </p>
      )}

      {
        //@ts-ignore
        !load && file.length === 0 && (
          <p className="ml-2 items-center justify-center text-lg text-cyan-500">
            No results found
          </p>
        )
      }
      <div className="xs:grid-cols-1 mx-2 mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {file.map(
          (file: {
            imagelink: "";
            name: "";
            id: "";
            folderName: "";
            isFolder: boolean;
          }) => {
            return (
              <div key={file.id}>
                {file.isFolder ? (
                  <div
                    onClick={() => router.push(`/folder?id=${file.id}`)}
                    className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-cyan-500 bg-slate-300"
                  >
                    {" "}
                    <AiFillFolder size={100} className="hover:scale-125" />
                    <p className="text-lg text-cyan-500">
                      {file.folderName.charAt(0).toUpperCase()}
                      {file.folderName.slice(1)}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <img
                      className=" h-40 w-full  rounded-md hover:scale-105 hover:shadow-lg hover:shadow-cyan-500"
                      src={file.imagelink}
                      alt="file"
                    />
                    <p className="my-2 text-lg text-cyan-500">{file.name}</p>
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Search;
