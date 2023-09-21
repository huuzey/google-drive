import { collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { database } from "~/firebaseConfig";

let files = collection(database, "files");
export const fetchonlyfolder = () => {
  const [filelist, setfilelist] = useState<Arraytype>([]);
  const { data: session } = useSession();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    return onSnapshot(files, (response) => {
      setfilelist(
        response.docs
          .map((item) => {
            return { ...item.data(), id: item.id };
          })
          .filter((item: any) => item.isFolder === true),
      );
    });
    setloading(false);
  }, []);
  return { filelist, loading };
};
export const fetchsearch = (search: string) => {
  const [filelist, setfilelist] = useState<Arraytype>([]);
  const { data: session } = useSession();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    return onSnapshot(files, (response) => {
      setfilelist(
        response.docs
          .map((item) => {
            return { ...item.data(), id: item.id };
          })
          .filter(
            (item: any) => item.folderName === search || item.name === search,
          ),
      );
    });
    setloading(false);
  }, []);
  return { filelist, loading };
};
