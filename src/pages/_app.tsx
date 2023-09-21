import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Topbar from "~/Topbar";
import UploadFiles from "~/components/UploadFiles";
import Search from "~/components/common/search";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className=" sticky top-0 z-40 flex justify-between rounded-md bg-amber-800 py-2 ">
        <UploadFiles />
        <Topbar />
      </div>
      <Search />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
