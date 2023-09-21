import React, { useState } from "react";
import { useFetchSession } from "~/hooks/useSession";
import Button from "./Button";
import { useRouter } from "next/router";

const Search = () => {
  const session = useFetchSession();
  const email = session.session?.user.email as string;
  const router = useRouter();
  const [search, setsearch] = useState("");
  const onsearch = () => {
    router.push(`/search/${search}`);
  };

  if (!email) {
    return;
  }
  return (
    <div className="flex">
      <input
        type="text"
        onChange={(ev) => setsearch(ev.target.value)}
        placeholder="Search for file or folder name"
        className="xs:w-3/4  input input-bordered input-accent  mx-2 mt-2 text-accent  placeholder:text-accent md:w-1/2 "
      />
      {search && (
        <Button
          title="Search"
          btnclass="btn btn-accent btn-outline mt-2"
          onclick={onsearch}
        />
      )}
    </div>
  );
};

export default Search;
