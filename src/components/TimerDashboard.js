import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Container,
  Flex,
  Image,
  Link,
  keyframes,
} from "@chakra-ui/react";

// const pulseAnimation = keyframes`
// 0% { transform: scale(1); }
// 50% { transform: scale(1.1); }
// 100% { transform: scale(1); }
// `;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const TimerDashboard = () => {
  const [time, setTime] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      clearInterval(interval);
      setIsActive(false);
      setIsFinished(true);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setTime(inputMinutes * 60);
    setIsActive(true);
    setInputMinutes(null);
    setIsFinished(false);
  };

  const handleInputChange = (event) => {
    setInputMinutes(event.target.value);
  };

  const handleReset = () => {
    setTime(null);
    setIsActive(false);
    setIsFinished(false);
    setInputMinutes("");
  };

  return (
    <>
      <Container maxW="container.xl" p={4} h="100vh">
        <Flex justify={"flex-start"} mb="4">
          <Input
            placeholder="Enter time in minutes"
            type="number"
            value={inputMinutes}
            onChange={handleInputChange}
            size="lg"
            maxW="500px"
            mr={4}
          />
          <Button colorScheme="teal" size="lg" onClick={handleStart} mr={2}>
            Start Timer
          </Button>
          <Button colorScheme="red" size="lg" onClick={handleReset}>
            Reset Timer
          </Button>
        </Flex>

        {/* Timer Section Start */}
        <Box
          borderWidth={"1px"}
          borderRadius={"lg"}
          p={8}
          boxShadow="lg"
          w="100%"
          h="80vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {isFinished ? (
            <Image
              src="https://c.tenor.com/CySM2cSTUGsAAAAC/tenor.gif"
              alt="timer finished"
              boxSize="100%"
              objectFit={"contain"}
            />
          ) : (
            <VStack spacing={4}>
              <HStack>
                <Text
                  fontSize="500px"
                  fontWeight={"bold"}
                  animation={
                    isActive ? `${blinkAnimation} 1s infinite` : "none"
                  }
                >
                  {Math.floor(time / 60)}:
                </Text>
                <Text
                  fontSize="500px"
                  fontWeight="bold"
                  animation={
                    isActive ? `${blinkAnimation} 1s infinite` : "none"
                  }
                >
                  {("0" + (time % 60)).slice(-2)}
                </Text>
              </HStack>
            </VStack>
          )}
        </Box>
        {/* Timer Section End */}
        {/* Footer Section Start */}
        <Box as="footer" mt={6} textAlign="center">
          <Text fontSize="md">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/deveshlashkari"
              isExternal
              color="teal.500"
            >
              Devesh Lashkari
            </Link>
          </Text>
        </Box>
        {/* Footer Section End */}
      </Container>
    </>
  );
};
export default TimerDashboard;
