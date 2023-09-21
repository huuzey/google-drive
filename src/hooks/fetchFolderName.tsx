import {
  onSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "~/firebaseConfig";

let files = collection(database, "files");

export const fetchFolderName = (parentId: string) => {
  const [folderName, setFolderName] = useState("");

  const getFolderName = () => {
    if (parentId) {
      let folderDoc = doc(files, parentId);
      onSnapshot(folderDoc, (response) => {
        setFolderName(response.data()?.folderName);
      });
    }
  };
  useEffect(() => {
    getFolderName();
  }, [parentId]);

  return { folderName };
};

export const fetchCurrentFolders = async (parentId: string) => {
  const [fileslist, setfileslist] = useState<Arraytype>([]);
  const [loading, setloading] = useState(true);
  const getfolders = () => {
    onSnapshot(files, (response) => {
      setfileslist(
        response.docs
          .map((item) => {
            return { ...item.data(), id: item.id };
          })
          .filter((item: any) => item.parentid === parentId),
      );
    });
    setloading(false);
  };
  useEffect(() => {
    getfolders();
  }, [parentId]);
  return { fileslist, loading };
};
