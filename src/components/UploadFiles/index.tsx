import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import Button from "../common/Button";
import { fileUpload } from "~/API/FileUpload";
import CommonProgress from "../common/progress";
import { addFolder } from "~/API/Firestore";
import { useRouter } from "next/router";
import { useFetchSession } from "~/hooks/useSession";

const UploadFiles = () => {
  const fileref = useRef<HTMLInputElement>(null);
  const [files, setfiles] = useState();
  const [progress, setprogress] = useState(0);

  const [progressive, setprogressive] = useState(false);
  const [foldervisible, setfoldervisible] = useState(false);
  const [foldername, setfoldername] = useState("");
  const router = useRouter();
  const session = useFetchSession();
  const email = session.session?.user.email as string;

  const parentid = router.query.id ? (router.query.id as string) : "";

  const UploadFiles = (event: ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];

    fileUpload(
      file,
      parentid,
      email,
      //@ts-ignore
      setprogress,
    );
  };
  console.log(parentid);
  const uploadfolder = () => {
    let payload = {
      folderName: foldername,
      isFolder: true,
      fileList: [],
      parentid: parentid,
      email: email,
    };
    addFolder(payload);
  };
  return (
    <div className=" md:flex">
      <div className=" ">
        <div>
          <Button
            onclick={() => {
              fileref.current?.click(), setfoldervisible(false);
            }}
            title="ADD A FILE"
            btnclass="btn btn-accent btn-outline mx-2 "
          />

          <Button
            onclick={() => setfoldervisible(!foldervisible)}
            title={`${foldervisible ? "CANCEL" : "CREATE A FOLDER"}   `}
            btnclass="btn btn-outline btn-secondary mx-2 "
          />
        </div>
        <div>
          {foldervisible ? (
            <input
              type="text"
              onChange={(ev) => setfoldername(ev.target.value)}
              placeholder="Type folder name"
              className="input input-bordered input-accent ml-2  mt-2 w-full max-w-xs text-accent placeholder:text-accent "
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {foldervisible && foldername ? (
        <>
          {" "}
          <Button
            onclick={() => {
              uploadfolder(), setfoldervisible(!foldervisible);
            }}
            title="SAVE FOLDER"
            btnclass="btn btn-outline btn-secondary mx-2 xs:mt-2 md:mt-0 "
          />
        </>
      ) : (
        <></>
      )}
      <input
        onChange={(event) => UploadFiles(event)}
        type="file"
        className="hidden"
        ref={fileref}
      />
      <div className="flex ">
        {progress != 0 && progress != 100 && (
          <>
            <CommonProgress progress={progress} />
            <p className="text-lg text-cyan-600">{progress}%</p>
          </>
        )}
      </div>
      {email && (
        <Button
          title="Folders"
          btnclass="btn btn-outline btn-secondary xs:mt-2 md:mt-0 ml-2"
          onclick={() => router.push("/onlyfolders")}
        />
      )}
    </div>
  );
};

export default UploadFiles;
