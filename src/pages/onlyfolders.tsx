import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiFillFolder } from "react-icons/ai";
import { fetchonlyfolder } from "~/hooks/fetchFiles";
import { useFetchSession } from "~/hooks/useSession";

const onlyfolders = () => {
  const router = useRouter();
  let { filelist, loading } = fetchonlyfolder();
  const session = useFetchSession();
  const email = session.session?.user.email as string;
  useEffect(() => {
    {
      !email && router.push("/");
    }
  }, []);
  return (
    <>
      {
        //@ts-ignore
        filelist?.length === 0 && !loading ? (
          <p className="flex items-center justify-center text-4xl text-cyan-500">
            No Files and Folders added
          </p>
        ) : (
          <div className="xs:grid-cols-1 mx-2 mb-4 mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {filelist.map(
              (file: {
                imagelink: "";
                name: "";
                id: "";
                folderName: "";
                isFolder: boolean;
              }) => {
                return (
                  <div
                    key={file.id}
                    onClick={() => router.push(`/folder?id=${file.id}`)}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-cyan-500 bg-slate-300"
                  >
                    <AiFillFolder size={100} className="hover:scale-125" />
                    <p className="text-lg text-cyan-500">
                      {file.folderName.charAt(0).toUpperCase()}
                      {file.folderName.slice(1)}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        )
      }
    </>
  );
};

export default onlyfolders;
