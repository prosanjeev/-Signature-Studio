import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import SignatureCanvas from "react-signature-canvas";

const Signature = () => {
  const { colorMode } = useColorMode();
  const [textColor, setTextColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState(
    colorMode === "light" ? "white" : "black"
  );
  const [fontSize, setFontSize] = useState("16");
  const [signature, setSignature] = useState("");
  const signatureRef = useRef();

  const clearSignature = () => {
    signatureRef.current.clear();
    setSignature("");
  };

  const saveSignature = () => {
    if (signatureRef.current.isEmpty()) {
      alert("Please provide a signature");
    } else {
      const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL();
      setSignature(dataURL);
    }
  };

  const downloadSignature = () => {
    const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container p="4" >
      <Flex textAlign="center" justify="center" mb="4" >
        <Heading as="h1" size="lg">
          Signature Studio
        </Heading>
       
      </Flex>
      <Stack align="center" mb="4" w={{base:'90vw', md:'25vw'}}>
        <Text mr="4">Text Color:</Text>
        <Select
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          mr="4"
        >
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </Select>
        <Text mr="4">Background Color:</Text>
        <Select
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          mr="4"
        >
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="gray">Gray</option>
          <option value="transparent">Transparent</option>
        </Select>
        <Text mr="4">Font Size:</Text>
        <Input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          w="20%"
          mr="4"
          
        />
      </Stack>
      <Stack direction={{ base: "column", md: "column" }} align="center" mb="4">
        <Box mr="4" border="2px solid gray">
          <SignatureCanvas
            ref={signatureRef}
            backgroundColor={
              backgroundColor === "transparent"
                ? "rgba(0,0,0,0)"
                : backgroundColor
            }
            penColor={textColor}
            canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
          />
        </Box>
        <Flex gap={10}>
        <Button colorScheme="red" onClick={clearSignature}>
          Clear
        </Button>
          <Button colorScheme="blue" onClick={saveSignature} mb="2">
            Save
          </Button>
          <Button colorScheme="green" onClick={downloadSignature}>
            Download
          </Button>
        </Flex>
      </Stack>
     
      {signature && (
        <Box>
          <Heading as="h3" size="md" mb="2">
            Your Signature:
          </Heading>
          <img src={signature} alt="signature" style={{ maxWidth: "100%" }} />
        </Box>
      )}
    </Container>
  );
};

export default Signature;
