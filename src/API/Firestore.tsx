import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { database } from "~/firebaseConfig";

let files = collection(database, "files");
export const addFiles = (
  imagelink: string,
  name: string,
  isFolder: boolean,
  parentid?: string,
  email?: string,
) => {
  try {
    addDoc(files, {
      imagelink: imagelink,
      name: name,
      parentid: parentid,
      isFolder: isFolder,
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFolder = (payload: {
  folderName: string;
  isFolder: boolean;
  fileList: object;
  parentid?: string;
  email: string;
}) => {
  try {
    addDoc(files, {
      folderName: payload.folderName,
      isFolder: payload.isFolder,
      FileList: payload.fileList,
      parentid: payload.parentid,
      email: payload.email,
    });
  } catch (error) {
    console.log(error);
  }
};
