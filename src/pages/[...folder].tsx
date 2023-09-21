import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { fetchCurrentFolders, fetchFolderName } from "~/hooks/fetchFolderName";
import { useFetchSession } from "~/hooks/useSession";

const Folder = () => {
  const router = useRouter();
  const session = useFetchSession();
  const [files, setfiles] = useState<Arraytype>([]);
  const [load, setload] = useState(true);
  const email = session.session?.user.email as string;
  const parentid = router.query.id as string;
  const foldername = fetchFolderName(parentid as string);
  const data = fetchCurrentFolders(parentid);
  data.then((res) => {
    setfiles(res.fileslist);
    setload(res.loading);
  });

  return (
    <div>
      <div>
        <p className=" mb-4 flex items-center justify-center text-2xl text-cyan-500">
          {foldername.folderName.charAt(0).toUpperCase()}
          {foldername.folderName.slice(1)} Folder
        </p>
      </div>

      {
        //@ts-ignore
        files.length === 0 && !load ? (
          <p className="flex items-center justify-center text-2xl text-cyan-500">
            No files or folders added to this folder
          </p>
        ) : (
          <div className="mx-2 mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map(
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
                        className=" flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-cyan-500 bg-slate-300"
                      >
                        {" "}
                        <AiFillFolder size={100} className="hover:scale-125" />
                        <p className="text-lg text-cyan-500">
                          {file.folderName.charAt(0).toUpperCase()}
                          {file.folderName.slice(1)}
                        </p>
                      </div>
                    ) : (
                      <div className=" flex flex-col">
                        <img
                          className=" h-40 w-full  rounded-md hover:scale-105 hover:shadow-lg hover:shadow-cyan-500"
                          src={file.imagelink}
                          alt="file"
                        />
                        <p className="my-2 text-lg text-cyan-500">
                          {file.name}
                        </p>
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>
        )
      }
    </div>
  );
};

export default Folder;
