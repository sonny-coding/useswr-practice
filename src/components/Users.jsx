import React from "react";
import useSWR from "swr";
import axios from "axios";
// import Image from "next/image";
import Image from "next/image";
import {
  Card,
  CardBody,
  Stack,
  Box,
  Text,
  chakra,
  Center,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";

const Users = ({ count, setCount }) => {
  const CustomImage = chakra(Image, {
    baseStyle: { maxH: 120, maxW: 120 },
    shouldForwardProp: (prop) =>
      [
        "width",
        "height",
        "src",
        "alt",
        // "quality",
        // "placeholder",
        // "blurDataURL",
        // "loader ",
      ].includes(prop),
  });

  const address = `https://randomuser.me/api/?results=${count}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(address, fetcher);
  console.log("🚀 ~ file: Users.jsx:9 ~ Users ~ data:", data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Box>
      <Wrap spacing="40px" align="center">
        {count >= 3 &&
          data.results.map((user) => (
            <WrapItem key={user.cell} w="400px">
              <Card bg="#f7f7f7">
                <Center>
                  <CustomImage
                    src={user.picture.large}
                    alt="descriptive"
                    width={128}
                    height={128}
                    borderRadius="lg"
                  />
                </Center>
                <CardBody>
                  <Stack>
                    <Center>
                      <Text>{`${user.name.first}  ${user.name.last}`}</Text>
                    </Center>
                    <Text>{`Country: ${user.location.country}`}</Text>
                    <Text>{`State: ${user.location.state}`}</Text>
                    <Text>{`Email: ${user.email}`}</Text>
                    <Text>{`Phone: ${user.phone}`}</Text>
                    <Text>{`Age ${user.dob.age}`}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </WrapItem>
          ))}
      </Wrap>
      <Center>
        <Button onClick={() => setCount(count + 3)} bg="twitter.100">
          ADD USER
        </Button>
      </Center>
    </Box>
  );
};

export default Users;
