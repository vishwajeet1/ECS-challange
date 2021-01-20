import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Layout = (props) => {
  return (
    <>
      <div className="flex justify-between px-4 md:px-8 py-2 md:py-4">
        <div>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input type="tel" placeholder="Search" />
            <InputRightElement pointerEvents="none" children={<ArrowForwardIcon />} />
          </InputGroup>
        </div>
        <div>cart</div>
      </div>
      <div className="px-4 md:px-8 py-2 md:py-4">{props.children}</div>
    </>
  );
};

export default Layout;
