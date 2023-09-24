import Navbar from "@/components/Navbar";
import OfficerCard from "@/components/OfficerCard";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function OfficersPage() {
  return (
    <Flex flexDir="column" paddingBottom="2em">
      <Navbar />
      <Flex
        flex="1"
        minHeight="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        backgroundAttachment="fixed"
        paddingRight="1em"
        paddingLeft="1em"
      >
        <Text fontSize="5rem">Officers</Text>
        <Flex
          flexDir="row"
          gap="1em"
          minWidth="85vw"
          justifyContent="center"
          flexWrap="wrap"
        >
          <OfficerCard
            name="Dalya Khaleel"
            photoSrc="/officerPhotos/dayla.jpeg"
            position="President"
            desc="Hi I'm Dalya, and Im your co-president this year! Im a junior this year at Cinco and my interests include singing, socializing, and (of course) volunteering!! I hope you'll all grow to love Key Club just as I do :D"
            bgPosY="-80%"
          />
          <OfficerCard
            name="Sneh Mamtora"
            photoSrc="/officerPhotos/sneh.jpg"
            position="President"
            bgPosY="-35%"
            desc="Hey there! My name is Sneh, and I am your Co-President for this year. I am an amateur astronomer, game enthusiast, and a terrible rock climber (getting better!). I hope I get to meet you at events and meetings!"
          />
          <OfficerCard
            name="Rebecca Jung"
            photoSrc="/officerPhotos/rebecca.jpeg"
            position="Vice President"
            bgPosY="-100%"
            desc="Hello! My name is Rebecca, and I am a junior. I am excited to say that I will be the Cinco Key Club vice president for the 2023-2024 school year. I enjoy listening to music, reading books, and watching movies in my free time. I look forward to seeing everyone having a great time in Key Club!"
          />
          <OfficerCard
            name="Christian Deunas"
            photoSrc="/officerPhotos/christian.jpg"
            position="Historian"
            desc="Hello! I'll be a senior entering the 2023 - 2024 school year as the historian for Key Club.  I'm very tired."
          />
          <OfficerCard
            name="Vivian Quach"
            photoSrc="/officerPhotos/vivian.jpeg"
            position="Historian"
            desc="Hey guys! I’m Vivian and I’m your 2023-2034 Key Club Historian :) About myself,  I love listening to music and attending concerts. I’m also a big foodie and love trying new dishes!"
            bgPosY="-50%"
          />
          <OfficerCard
            name="Sam Venegas"
            photoSrc="/officerPhotos/sam.jpeg"
            position="Treasurer"
            desc="i love keyclub"
          />
          <OfficerCard
            name="Jerry Zhou"
            photoSrc="/officerPhotos/jerry.jpeg"
            position="Treasurer"
            desc="Hi, I’m Jerry and I’m a senior and a treasurer for key club. A fun fact about me is that I hate tomatoes."
            bgPosY="-50%"
          />
          <OfficerCard
            name="Sofia Suarez"
            photoSrc="/officerPhotos/sofia.jpeg"
            position="Secretary"
            desc="Hello, I am sofia! Fun fact about me is that I love to watch baseball with my family and I hate horror movies (i'm too scared). "
            bgPosY="-50%"
          />
           <OfficerCard
            name="Collin Le"
            photoSrc="/officerPhotos/collin.jpeg"
            position="Secretary"
            desc="Hi, I am Collin, and I love playing the flute and going hiking (only if it's cold). I enjoy cooking big meals and gardening. Also, I have an old man's taste, so anything that is bitter and minimalistic. Give me a pillow, and I'll sleep anywhere."
            bgPosY="-25%"
          />
          <OfficerCard
            name="Felice Bulos"
            photoSrc="/officerPhotos/felice.jpeg"
            position="Editor"
            desc="Hello! I’m your 2023-24 editor, I’m currently a junior and I don’t really have much to say about myself but I like to draw and play tennis! I hope everyone has a great year in key club!^-^"
            bgPosY="-25%"
          />
          <OfficerCard
            name="Alex Park"
            photoSrc="/officerPhotos/sus.jpg"
            position="Webmaster"
            desc="Hi! I made this website. I am interested in programming, system administration, and planes."
            bgPosY="0%"
          />
           <OfficerCard
            name="Katherine"
            photoSrc="/officerPhotos/katherine.jpeg"
            position="General Manager"
            desc="Hello, I’m Katherine and i’ll be your general manager. I’m a Senior and super excited for this year. I love going to concerts, reading and the color purple. I also really like trying out new things and go to new places. "
            bgPosY="-65%"
          />
          <OfficerCard 
            name="Tobi Ladeji"
            desc="Hi I’m Tobi. I’m a junior and I love bake and go running. My favorite candy is sour patch kids."
            position="General Manager"
            photoSrc="/officerPhotos/tobi.jpeg"
          />

        </Flex>
      </Flex>
    </Flex>
  );
}

