import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <Flex style={{minHeight: "100vh"}} flexDir="column">
      <Navbar />
  
      <Flex flexDir="column" alignItems="center" justifyContent='center' flex="1">
        <Text fontSize="3rem" fontWeight="extrabold" >
          Cinco Key Club
        </Text>
        <Text fontSize="1.25rem">Division 3W - <Link href="https://tokeyclub.com/"><u>TO Key Club</u></Link></Text>
        <Link href="/about"><Text fontSize="1.1rem" as="u">What&apos;s Key Club?</Text></Link>
        <Image src="/kc.png" width="300" height="300" alt="Key Club Logo" />
        <Button onClick={() => router.push('/submit')}>Submit your hours!</Button>
      </Flex>

      

      {/* <Text fontSize="1.1rem" textAlign="center" marginBottom="3em" paddingLeft="4em" paddingRight="4em">Key Club is a volunteer organization that stands for Kiwanis Empowering Youth. Key Club members around the world are learning how to lead and stand for what’s right through service and volunteerism. In partnership with their local Kiwanis club, high school students are making a positive impact as they serve others in their schools and communities.</Text> */}


      {/* <div
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
      </div> */}
    </Flex>
  );
}
