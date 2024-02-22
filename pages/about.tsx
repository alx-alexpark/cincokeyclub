import Navbar from "@/components/Navbar";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function About() {
    return ( <Flex flexDir="column" paddingBottom="2em">
    <Navbar />
    <Flex
      flex="1"
      minHeight="100vh"
      width="100vw"
      flexDir="column"
      backgroundAttachment="fixed"
      alignItems="center"
      justifyContent="center"
    >
      <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6">
          <div className="mx-auto max-w-3xl">
            <div className="bg-white rounded-lg p-8">
              <h2 className="font-bold tracking-tighter sm:text-4xl md:text-6xl/none lg:text-6xl/none mb-6" style={{color: "black"}}>
               What is key club?
              </h2>
              <p className="dark:text-gray-950 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-950 mb-3">
              Key Club is an <Link href="https://keyclub.org"><Text as="u">international network of student-led volunteering clubs.</Text></Link> Local Key Clubs help organize volunteer service events for their school and community.
              </p>
              <h2 className="text-lg font-bold tracking-tighter sm:text-4xl mb-6" style={{color: "black"}}>
              Contact us 
              </h2>
              <p className="dark:text-gray-950 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-950 mb-3">
              You can contact individual officers on the <Link href="/officers"><Text as="u"> officers page.</Text></Link>
              </p>
              <br/><p className="dark:text-gray-950 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-950 mb-3">
              Our division's Lt. Governer, Helen Conde, can be reached at <Link href="mailto:ltg3w@tokeyclub.com"><Text as="u">ltg3w@tokeyclub.com.</Text></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </Flex>
  </Flex>);
}