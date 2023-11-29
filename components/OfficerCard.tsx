import { Card, CardBody, Text } from "@chakra-ui/react";
import Image from "next/image";

interface OfficerCardProps {
  photoSrc: string;
  name: string;
  position: string;
  desc: string;
  bgPosY?: string;
  bgPosX?: string;
}

export default function OfficerCard({
  photoSrc,
  name,
  position,
  desc,
  bgPosX,
  bgPosY,
}: OfficerCardProps) {
  return (
    <Card borderRadius="12" height="27em" width="20rem" overflow="hidden">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          borderRadius: "15",
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            borderRadius: "15",
            objectFit: "cover",
            position: "relative",
            top: bgPosY ?? 0,
            left: bgPosX ?? 0,
          }}
          src={photoSrc}
          width="400"
          height="400"
          alt="Officer Photo"
        />
      </div>
      <CardBody>
        <Text fontWeight="bold" fontSize="lg">
          {name} - {position}
        </Text>
        <Text>{desc}</Text>
      </CardBody>
    </Card>
  );
}
