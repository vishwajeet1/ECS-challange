import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";

const Layout = ({ searchResult, setSearchResult, children, searchAction, checkOutList,openModal }) => {

  const onChangeHandler=(e)=>{
    setSearchResult(e.target.value)
  }
  return (
    <>
      <div className="flex justify-between px-4 md:px-8 py-2 md:py-4">
        <div>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="tel"
              placeholder="Search"
              value={searchResult}
              onChange={onChangeHandler}
            />
            <InputRightElement pointerEvents="Pointer">
              <Button size="sm" padding={2} onClick={searchAction}>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <div onClick={openModal} >CART {checkOutList.length}</div>
      </div>
      <div className="px-4 md:px-8 py-2 md:py-4">{children}</div>
    </>
  );
};

export default Layout;
