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
  // const [filterData, setFilterData] = useState([]);
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
  // const handleFilter = (e) => {
  //   let Element = [...data];

  //   Element = Element.filter((item) => item.type === e);
  //   setData(Element);
  //   // console.log(Element)
  // };

  const handleFilterOwner = () => {
    // setData(data);
    let filterOwner = [...data];
    filterOwner = filterOwner.filter((item) => item.type === "owner");
    setData([...filterOwner]);
  };

  const handleFilterTenant = () => {
    // setData(data);
    let filterTenant = [...data];
    filterTenant = filterTenant.filter((item) => item.type === "tenant");
    setData([...filterTenant]);
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
  // const handlelogout = () => {
  //   auth.logout();
  //   navigate("/");
  // };

  return (
    <div className="backgroundImage">
      {/* Loading indicator */}
      {loading ? <Spinner size="xl" /> : ""}
      {/* <div className="flx">
        <div className="flexDiv">
          {auth.user}
          <button onClick={handlelogout}>Logout</button>
        </div>
      </div> */}
      <Wrap justify="space-evenly">
        {/* asc desc */}
        <Box className="leftContainer">
          <WrapItem>
            <Center className="btnBorderSelect">
              <Box w="50">
                <Select
                  placeholder="Sort by Flat Number"
                  value={sort}
                  onChange={handleSort}
                  style={{
                    border: "none",
                    textAlign: "center",
                    backgroundColor: "#e5ebf2",
                    fontSize: "18px",
                    padding: "8px",
                  }}
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
                <button
                  className="btnBorderClrChild"
                  onClick={handleFilterOwner}
                >
                  Owner
                </button>
              </Box>
            </Center>
          </WrapItem>
          <WrapItem>
            {/* filter */}
            <Center>
              <Box w="50" className="btnBorderClr">
                <Box>
                  {/* <button onClick={() => handleFilter("Tenant")}>Tenant</button> */}
                  <button
                    className="btnBorderClrChild"
                    onClick={handleFilterTenant}
                  >
                    Tenant
                  </button>
                </Box>
              </Box>
            </Center>
          </WrapItem>
          {/* add flat in back-end */}
          <WrapItem>
            <Center>
              <Link to="/flatform">
                <Button className="btn1">Add Flat</Button>
              </Link>
            </Center>
          </WrapItem>
        </Box>
        {/* table */}
        <WrapItem>
          <Center>
            {/* populate data in table */}
            <Box className="navbar2">
              <TableContainer>
                {/* <Center></Center> */}
                <Table>
                  <Thead>
                    <Tr>
                      <Th id="one">Block</Th>
                      <Th id="two">Flat Number</Th>
                      <Th id="three">Resident Name</Th>
                      <Th id="four">Type</Th>
                      <Th isNumeric id="five">
                        Number of Residents
                      </Th>
                      <Th id="six">image</Th>
                      <Th id="seven">Remove Flat</Th>
                    </Tr>
                  </Thead>

                  <Tbody className="fontsize">
                    {data.slice(start, end).map((e, i) => {
                      return (
                        <Tr key={i} className="fontsize">
                          <Td>{e.block}</Td>
                          <Td style={{ textAlign: "center" }}>
                            {e.flat_number}
                          </Td>
                          <Td>{e.name}</Td>
                          <Td style={{ textTransform: "lowecase" }}>
                            {e.type}
                          </Td>
                          <Td style={{ textAlign: "center" }} isNumeric>
                            {e.residents}
                          </Td>
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
                          <Td style={{ textAlign: "center" }}>
                            <button
                              className="delBtn"
                              onClick={() => deleteButton(e._id)}
                            >
                              Delete
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
        {/* ////////////////////////// */}
        <WrapItem>
          <Box className="leftContainer">
            <WrapItem>
              <Center className="btnBorderSelect"></Center>
            </WrapItem>
            {/* owner tenant */}
          </Box>
        </WrapItem>

        {/* ////////////////////////// */}
      </Wrap>
      {/* <Post posts={data} />
      <Paginate postPerend={postPerend} totalPosts={data.length} /> */}
    </div>
  );
};
