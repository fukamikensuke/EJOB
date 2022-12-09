import { Card, CardBody, Text, Container, Center } from "@chakra-ui/react";
import { VSpacer } from "../components/Spacer/Spacer";

export default function Error() {
  return (
    <>
      <Container maxW="xl">
        <VSpacer size={8} />
        <Card>
          <CardBody>
            <Center>
              <Text fontSize="4xl" as="b">
                404 Not Found
              </Text>
            </Center>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
