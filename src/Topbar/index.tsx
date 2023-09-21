import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Button from "~/components/common/Button";
import { useFetchSession } from "~/hooks/useSession";
import CommonProgress from "~/components/common/progress";

const Topbar = () => {
  let { session } = useFetchSession();
  const [logo, setlogo] = useState(false);

  return (
    <div>
      {" "}
      {session ? (
        <img
          onClick={() => setlogo(!logo)}
          className="h-12 w-12 cursor-pointer rounded-full   hover:scale-110"
          src={session?.user.image as string}
        />
      ) : (
        <Button
          onclick={() => signIn()}
          btnclass="btn-primary"
          title="Sign Up"
        />
      )}
      {logo && (
        <Button
          onclick={() => signOut()}
          btnclass="btn-primary  absolute top-14 right-1  "
          title="Logout"
        />
      )}
    </div>
  );
};

export default Topbar;
