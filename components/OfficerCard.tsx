import { Card, CardBody, Text } from "@chakra-ui/react";
import Image from 'next/image';

interface OfficerCardProps {
    photoSrc: string;
    name: string;
    position: string;
    desc: string;
}

export default function OfficerCard({ photoSrc, name, position, desc }: OfficerCardProps) {
    return (
        <Card borderRadius="12" minHeight="27em" maxWidth="20rem" overflow="hidden">
            <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexGrow: '1', borderRadius: '15'}}>
                <Image
                    style={{ borderRadius: '15' }}
                    fill
                    objectFit='fill'
                    src={photoSrc}
                    alt='Officer Photo'
                />
            </div>
            <CardBody>
                <Text fontWeight="bold" fontSize="lg">{name} - {position}</Text>
                <Text>{desc}</Text>
            </CardBody>
        </Card>
    );
}