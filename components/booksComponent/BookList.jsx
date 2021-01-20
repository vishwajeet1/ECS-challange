import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import StarsRating from "stars-rating";
import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "@chakra-ui/icons";

const mocksData = {
  bookID: 1,
  title: "Harry Potter and the Half-Blood Prince (Harry Potter  #6)",
  authors: "J.K. Rowling-Mary GrandPré",
  average_rating: 4.56,
  isbn: 439785960,
  language_code: "eng",
  ratings_count: 1944099,
  price: 230,
};

const BookListTable = ({
  bookList,
  handleBookClickEvent,
  handleRowClickEvent,
  addBookCart,
}) => {
  const [title, setTitle] = useState(false);
  const [avgRating, setAvgRating] = useState(false);
  const [price, setPrice] = useState(false);

  const [isActiveTitle, setIsActiveTitle] = useState(false);
  const [isActiveAvgRating, setIsActiveRating] = useState(false);
  const [isActivePrice, setIsActivePrice] = useState(false);

  const activeState = (rowName) => {
    if (rowName == "title") {
      setIsActiveTitle(true);
      setIsActiveRating(false);
      setIsActivePrice(false);
    } else if (rowName == "avg") {
      setIsActiveTitle(false);
      setIsActiveRating(true);
      setIsActivePrice(false);
    } else if (rowName == "price") {
      setIsActiveTitle(false);
      setIsActiveRating(false);
      setIsActivePrice(true);
    }
  };

  return (
    <div>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th
              onClick={() => {
                setTitle(() => {
                  return !title;
                });
                activeState("title");
                handleRowClickEvent("title", title);
              }}
            >
              Title{" "}
              {isActiveTitle && (title ? <ArrowDownIcon /> : <ArrowUpIcon />)}
            </Th>
            <Th
              onClick={() => {
                setAvgRating(() => {
                  return !avgRating;
                });
                activeState("avg");
                handleRowClickEvent("average_rating", avgRating);
              }}
            >
              Avg Rating{" "}
              {isActiveAvgRating &&
                (avgRating ? <ArrowDownIcon /> : <ArrowUpIcon />)}
            </Th>
            <Th>language_code</Th>
            <Th
              onClick={() => {
                setPrice(() => {
                  return !price;
                });
                activeState("price");
                handleRowClickEvent("price", price);
              }}
            >
              price{" "}
              {isActivePrice && (price ? <ArrowDownIcon /> : <ArrowUpIcon />)}
            </Th>
            <Th>Checkout</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookList.map((books) => (
            <Tr id={books.bookID}>
              <Td>{books.title}</Td>
              <Td>
                <div>
                  <StarsRating
                    count={5}
                    value={books.average_rating}
                    size={12}
                    color2={"#ffd700"}
                    edit={false}
                  />
                </div>
              </Td>
              <Td>{books.language_code}</Td>
              <Td>{books.price}</Td>
              <Td><Button onClick={()=>{addBookCart(books.isbn)}} > Add to cart</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default BookListTable;
