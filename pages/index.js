import Head from "next/head";

import styles from "../styles/Home.module.css";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import BookListTable from "components/booksComponent/BookList";
import { showOnlyTop } from "utils/filtersList";
import StarsRating from "stars-rating";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Router from "next/dist/next-server/lib/router/router";

export default function Home() {
  const [bookList, setBookList] = useState([]);
  const [sortedBookList, setSortedBookList] = useState([]);
  const [showLimit, setShowLimit] = useState(50);
  const [searchResult, setSearchResult] = useState("");
  const [checkOutList, setCheckOutList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router=useRouter();

  useEffect(() => {
    fetchBookApi();
  }, []);

  const fetchBookApi = async () => {
    try {
      const res = await axios.get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
      );
      if (res.status == 200) {
        setBookList(res.data);
        let result = res.data.sort(sortByProperty("average_rating"));
        const limitedResult = [];
        for (let i = 0; i < 200; i++) {
          limitedResult.push(result[i]);
        }
        setTimeout(() => {
          setSortedBookList(limitedResult);
        }, 1000);
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addBookCart = (isbn) => {
    const temp = bookList.find((books) => books.isbn === isbn);
    const newAddBook = [...checkOutList];
    newAddBook.push(temp);
    console.log("newAddBook", newAddBook);
    setCheckOutList(newAddBook);
  };

  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return -1;
      else if (a[property] < b[property]) return 1;

      return 0;
    };
  }

  function sortByPropertyAcs(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;

      return 0;
    };
  }

  const removeFromCheckOut=(isbn)=>{
    const temp = checkOutList.filter((books) => books.isbn !== isbn);
    setCheckOutList(temp)
  }

  const handleBookClickEvent = () => {};

  const searchAction = () => {
    const result = filteredBook(bookList, searchResult);
    console.log("result", result, bookList, searchResult);
    setSortedBookList(result.filter((val, index) => index < showLimit));
  };
  const handleRowClickEvent = (property, order) => {
    const updateResult = showOnlyTop(showLimit, bookList, property, order);
    setSortedBookList(updateResult);
  };

  const filteredBook = (bookDetails, search) =>
    bookDetails.filter((book) => {
      try {
        return book.title.toLowerCase().search(search.toLowerCase()) !== -1;
      } catch {
        return false;
      }
    });

  return (
    <Layout
      searchResult={searchResult}
      setSearchResult={setSearchResult}
      searchAction={searchAction}
      checkOutList={checkOutList}
      openModal={onOpen}
    >
      <BookListTable
        addBookCart={addBookCart}
        bookList={sortedBookList}
        handleBookClickEvent={() => {}}
        handleRowClickEvent={handleRowClickEvent}
      ></BookListTable>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {checkOutList.map((data) => (
              <div className="flex justify-between items-center w-full my-4 py-2 border">
                <div>Title:{data.title}</div>
                <div>
                  <StarsRating
                    count={5}
                    value={data.average_rating}
                    size={12}
                    color2={"#ffd700"}
                    edit={false}
                  />
                </div>
                <div>Price:{data.price}</div>
                <div onClick={()=>{removeFromCheckOut(data.isbn)}}><CloseIcon></CloseIcon></div>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={()=>{
              router.push("thankyou")
            }}>Checkout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
