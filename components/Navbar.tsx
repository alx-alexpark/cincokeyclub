import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}
let NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Submit Hours",
    href: "/submit",
  },
  {
    label: "Check your hours",
    href: "/myHours",
  },
  {
    label: "Hours leaderboard",
    href: "/leaderboard"
  },
  {
    label: "Officers",
    href: "/officers"
  }
];

const NAV_ITEMS_ADMIN: Array<NavItem> = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Submit Hours",
    href: "/submit",
  },
  {
    label: "Check your hours",
    href: "/myHours",
  },
  {
    label: "Hours leaderboard",
    href: "/leaderboard"
  },
  {
    label: "Officers",
    href: "/officers"
  },
  {
    label: "Review hours",
    href: "/admin/review"
  },
  {
    label: "Manually add hours",
    href: "/admin/manualAdd"
  }
];

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session, status } = useSession();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (session) {
      axios.get("/api/isadmin").then((data) => {
        console.log(data);
        if (data.data.admin) {
          NAV_ITEMS = NAV_ITEMS_ADMIN;
          setValue((value) => value + 1);
        }
      });
    }
  }, []);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        width="100vw"
        py={{ base: 2 }}
        px={{ base: 4 }}
        // borderBottom={1}
        // borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            display={{md: "none"}}
          >
            Cinco Key Club
          </Text>
          {/* <Image src="/android-chrome-192x192.png" alt={"The Cinco Key Club logo"} width="16" height="16" style={{maxWidth: "100%", alignSelf: 'start'}}/> */}
          <Flex display={{ base: "none", md: "flex" }}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {/* <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
            Sign In
          </Button> */}
          {status == "authenticated" ? (
            <>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              onClick={() => signOut()}
              fontWeight={600}
              color={"white"}
              bg={"red.400"}
              href={"#"}
              _hover={{
                bg: "red.500",
              }}
            >
              Sign out
            </Button>
            </>
          ) : (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              onClick={() => signIn("google")}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"#"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Login/Register
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

let NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Submit Hours",
    href: "/submit",
  },
  {
    label: "My Hours",
    href: "/myHours",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Officers",
    href: "/officers",
  },
  {
    label: "Gallery",
    href: "https://gallery.cincokey.club",
  },
  {
    label: "Profile",
    href: "/profile",
  },
];

const NAV_ITEMS_ADMIN: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Submit Hours",
    href: "/submit",
  },
  {
    label: "My Hours",
    href: "/myHours",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
  {
    label: "Officers",
    href: "/officers",
  },
  {
    label: "Gallery",
    href: "https://gallery.cincokey.club",
  },
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Review",
    href: "/admin/review",
  },
  {
    label: "Add hours",
    href: "/admin/manualAdd",
  },
  {
    label: "Audit hours",
    href: "/admin/viewHours",
  },
];
