import "../../styles/flat.css";
import axios from "axios";

// chakra
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Center,
  WrapItem,
  Wrap,
  Select,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Post } from "../pagination/Posts";
// import { Paginate } from "../pagination/Paginate";
export const Flat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [sort, setSort] = useState("asc");
  const [filterValue, setFilterValue] = useState([]);
  // filter

  useEffect(() => {
    setLoading(true);
    getFlatData();
  }, [data]);
  // function
  const getFlatData = () => {
    setLoading(true);
    axios({
      url: `https://apartmentauth.herokuapp.com/flat`,
      method: "GET",
    })
      .then((r) => setData(r.data), setLoading(false))
      .catch((err) => console.log("error", err.message));
  };
  console.log("data", data);

  // sort asc desc
  const handleSort = (e) => {
    // console.log(e.target.value);
    setSort(e.target.value);
  };
  sort === "asc"
    ? data.sort((a, b) => a.flat_number - b.flat_number)
    : data.sort((a, b) => b.flat_number - a.flat_number);

  //filter
  const handleFilter = (e) => {
    let Element = [...data];
    Element = Element.filter((item) => item.type === e);
    setData(Element);
    console.log(Element);
  };

  //load more end Data
  // const [endUpto, setendUpto] = useState(2);
  // const loadMoreData = () => {
  //   setendUpto(endUpto + 2);
  // };
  // slice(0, endUpto)
  const [start, setstart] = useState(0);
  const [end, setend] = useState(2);

  const next = () => {
    setend(end + 1);
    setstart(start + 1);
  };
  const previous = () => {
    if (start < 1) {
      setstart(2);
      setend(3);
    }
    setend(end - 1);
    setstart(start - 1);
  };

  return (
    <div className="backgroundImage">
      {/* Loading indicator */}
      {loading && (
        <div>
          <Spinner size="xl" />
        </div>
      )}
      {/* Error indicator */}

      <Wrap>
        {/* asc desc */}
        <WrapItem>
          <Center>
            <Box w="50" className="btnBorderClr">
              <Select
                placeholder="Sort by Flat Number"
                value={sort}
                onChange={handleSort}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </Box>
          </Center>
        </WrapItem>
        {/* owner tenant */}
        <WrapItem>
          {/* filter */}
          <Center>
            <Box w="50" className="btnBorderClr">
              <Select
                placeholder="Resident Type"
                value={data}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="owner">Owner</option>
                <option value="Tenent">Tenant</option>
              </Select>
            </Box>
          </Center>
        </WrapItem>
        {/* add flat in back-end */}
        <WrapItem>
          <Center>
            <Link to="/flatform">
              <Button>add flat</Button>
            </Link>
          </Center>
        </WrapItem>
        {/* table */}
        <WrapItem>
          <Center>
            {/* populate data in table */}
            <Box>
              <TableContainer>
                <Center></Center>
                <Table>
                  <Thead bg="LightSalmon">
                    <Tr>
                      <Th>Block</Th>
                      <Th>Flat Number</Th>
                      <Th>Type</Th>
                      <Th isNumeric>Number of Residents</Th>
                      <Th>image</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data.slice(start, end).map((e, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{e.block}</Td>
                          <Td>{e.flat_number}</Td>
                          <Td>{e.type}</Td>
                          <Td isNumeric>{e.residents}</Td>
                          <Td>
                            <Link to={`/flatdetails/${e._id}`}>
                              <img
                                src={e.image}
                                alt=""
                                width="300px"
                                height="200px"
                              />
                            </Link>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
                {/* <Button onClick={loadMoreData}>Load more</Button> */}
                <button
                  className="btn"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    previous();
                  }}
                >
                  Previous
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    next();
                  }}
                >
                  Next
                </button>
              </TableContainer>
            </Box>
          </Center>
        </WrapItem>
      </Wrap>
      {/* <Post posts={data} />
      <Paginate postPerend={postPerend} totalPosts={data.length} /> */}
    </div>
  );
};
