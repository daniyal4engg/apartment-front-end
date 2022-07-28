import "../../styles/flat.css";
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
import axios from "axios";
import { useAuth } from "../Context/Auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Flat = ({ check }) => {
  // login
  const auth = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("asc");
  // filter

  useEffect(() => {
    setLoading(true);
    getFlatData();
  }, []);
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

  console.log("update data", data);

  // sort asc desc
  const handleSort = (e) => {
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
    // console.log(Element)
  };

  //load more end Data
  // const [endUpto, setendUpto] = useState(2);
  // const loadMoreData = () => {
  //   setendUpto(endUpto + 2);
  // };
  // slice(0, endUpto)
  const [start, setStart] = useState(0);
  const [end, setend] = useState(3);

  // page next and stop
  const next = () => {
    setStart(start + 3);
    setend(end + 3);
    if (end > data.length - 1) {
      setStart(data.length - 3);
      setend(data.length);
    }
  };
  // page previos and stop
  const previous = () => {
    setStart(start - 3);
    setend(end - 3);
    if (start < 1 || end < 3) {
      setStart(0);
      setend(3);
    }
  };

  // delete data
  const deleteButton = (_id) => {
    console.log(_id);
    axios
      .delete(`${"https://apartmentauth.herokuapp.com/flat"}/${_id}`)
      .then(() => {
        let newList = data.filter((el) => el._id !== _id);

        setData(newList);
      });
  };
  // logout btn extra
  const handlelogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="backgroundImage">
      {/* Loading indicator */}
      {loading ? <Spinner size="xl" /> : ""}
      {/* Error indicator */}
      <div>
        welcom {auth.user}
        <button onClick={handlelogout}>Logout</button>
      </div>
      <Wrap>
        {/* asc desc */}
        <Box className="leftContainer">
          <WrapItem>
            <Center>
              <Box w="50" className="btnBorderSelect">
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
                <button onClick={() => handleFilter("owner")}>Owner</button>
              </Box>
            </Center>
          </WrapItem>
          <WrapItem>
            {/* filter */}
            <Center>
              <Box w="50" className="btnBorderClr">
                <Box>
                  <button onClick={() => handleFilter("Tenant")}>Tenant</button>
                </Box>
              </Box>
            </Center>
          </WrapItem>
          {/* add flat in back-end */}
          <WrapItem>
            <Center>
              <Link to="/flatform">
                <Button className="btn1">add flat</Button>
              </Link>
            </Center>
          </WrapItem>
        </Box>
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
                      <Th>Resident Name</Th>
                      <Th>Type</Th>
                      <Th isNumeric>Number of Residents</Th>
                      <Th>image</Th>
                      <Th>Remove Flat</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data.slice(start, end).map((e, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{e.block}</Td>
                          <Td>{e.flat_number}</Td>
                          <Td>{e.name}</Td>
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
                          <Td>
                            <button
                              className="delBtn"
                              onClick={() => deleteButton(e._id)}
                            >
                              delete
                            </button>
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
