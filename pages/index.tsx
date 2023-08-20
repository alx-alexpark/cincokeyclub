import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  // useEffect(() => {
  //   toast.warning("WARNING: This website is in alpha, many things are subject to change and bugs will be present.")
  // }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-30">
      <Flex flexDir="column" alignItems="center" justifyContent='center'>
        <Text fontSize="3rem" fontWeight="extrabold" marginTop="1em">
          Cinco Key Club
        </Text>
        <Text fontSize="1.25rem">Division 3W - TO Key Club</Text>
      </Flex>
      <Image src="/kc.png" width="325" height="325" alt="Key Club Logo" />

      <div
        className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"
        style={{ marginBottom: "2em" }}
      >
        <Link
          href="/submit"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-blue-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Submit Hours{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Log in and submit your hours!
          </p>
        </Link>

        <Link
          href="/wip"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-blue-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            See our photos{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            We publish photos of our activities.
          </p>
        </Link>

        <Link
          href="/leaderboard"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-blue-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Leaderboard{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            See who has the most volunteer hours.
          </p>
        </Link>

        <a
          href="/wip"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-blue-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Partner with us{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Are you an organization that needs volunteers? Contact us here!
          </p>
        </a>
      </div>
    </main>
  );
}
