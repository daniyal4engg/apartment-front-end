import "../../styles/flatform.css";
import { useState } from "react";
import axios from "axios";
import { useToast, Button } from "@chakra-ui/react";
export const FlatForm = () => {
  const [formData, setFormData] = useState({
    block: "",
    flat_number: "",
    type: "",
    image: "",
    residents: "",
    name: "",
    gender: "",
    age: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    // console.log(e.target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    axios
      .post("https://apartmentauth.herokuapp.com/flat", formData)
      .then(() => {
        alert("user created succussfully");
        setFormData({
          block: "",
          flat_number: "",
          type: "",
          image: "",
          residents: "",
          name: "",
          gender: "",
          age: "",
        });
      });
  };
  return (
    <div>
      <div className="parent">
        <p> Add flat</p>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="block">Block </label> */}

          <input
            className="border"
            type="text"
            value={formData.block}
            onChange={handleChange}
            id="block"
            placeholder="Block"
          />
          <br />
          {/* <label htmlFor="flat-Number">Flat Number</label> */}
          <input
            className="border"
            type="text"
            value={formData.flat_number}
            onChange={handleChange}
            id="flat_number"
            placeholder="Flat Number"
          />
          <br />
          {/* <label htmlFor="Type">Type of Flat</label> */}
          <input
            className="border"
            type="text"
            value={formData.type}
            onChange={handleChange}
            id="type"
            placeholder="Type"
          />
          <br />
          {/* <label htmlFor="imageUrl">Image</label> */}
          <input
            className="border"
            type="text"
            value={formData.image}
            onChange={handleChange}
            id="image"
            placeholder="Image"
          />
          <br />
          {/* <label htmlFor="residents">Residence</label> */}
          <input
            className="border"
            type="text"
            value={formData.residents}
            onChange={handleChange}
            id="residents"
            placeholder="No of residence"
          />
          <br />
          {/* <label htmlFor="name">Name</label> */}
          <input
            className="border"
            type="text"
            value={formData.name}
            onChange={handleChange}
            id="name"
            placeholder="Name"
          />
          <br />
          {/* <label htmlFor="fgender">Gender</label> */}
          <input
            className="border"
            type="text"
            value={formData.gender}
            onChange={handleChange}
            id="gender"
            placeholder="Gender"
          />
          <br />
          {/* <label htmlFor="age">Age</label> */}
          <input
            className="border"
            type="text"
            value={formData.age}
            onChange={handleChange}
            id="age"
            placeholder="Age"
          />
          <br />
          <input className="btnSumit" type="submit" />
        </form>
      </div>
    </div>
  );
};
function ToastExample() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}

// import { Ce <br />nter, FormControl, label, Input className="border" } from "@chakra-ui/react";
// import axios from "axios";
// import { Button } from "bootstrap";
// import { useState } from "react";
// export const FlatForm = () => {
//   const [formData, setFormData] = useState({
//     block: "",
//     flatNumber: "",
//     type: "",
//     image: "",
//     residence: "",
//     name: "",
//     gender: "",
//     age: "",
//   });
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };
//   const submit = (e) => {
//     e.preventDefault();
//     axios
//       .post("https://apartmentauth.herokuapp.com/flat", formData)
//       .then(() => {
//         alert("data added");
//         setFormData({
//           block: "",
//           flatNumber: "",
//           type: "",
//           image: "",
//           residence: "",
//           name: "",
//           gender: "",
//           age: "",
//         });
//       })
//       .catch((e) => e.message);
//   };

//   console.log(formData);
//   return (

//   );
// };

//  <>

//        <Center>
//          <FormControl isRequired onSubmit={handleSubmit}>
//            {/* block */}
//            <label htmlFor="block">Block</label>
//            <Input className="border"
//              type="text"
//           value={formData.block}
//           onChange={handleChange}
//           id="block"
//           placeholder="block"
//            />
//            {/* flat */}
//            <label htmlFor="flat-Number">Flat Number</label>
//            <Input className="border"
//           type="text"
//           value={formData.flat_number}
//           onChange={handleChange}
//           id="flat_number"
//           placeholder="flatNumber"
//            />
//            {/* type of flat */}
//            <label htmlFor="Type">Type of Flat</label>
//            <Input className="border"
//          type="text"
//           value={formData.type}
//           onChange={handleChange}
//           id="type"
//           placeholder="type"
//            />
//            {/* image url */}
//            <label htmlFor="imageUrl">Image</label>
//            <Input className="border"
//             type="text"
//           value={formData.image}
//           onChange={handleChange}
//           id="image"
//           placeholder="image"
//            />
//            {/*residence  */}
//            <label htmlFor="residents">Residence</label>
//            <Input className="border"
//            type="text"
//           value={formData.residents}
//           onChange={handleChange}
//           id="residents"
//           placeholder="No of residence"
//            />
//            {/* name */}
//            <label htmlFor="name">Name</label>
//            <Input className="border"
//                type="text"
//           value={formData.name}
//           onChange={handleChange}
//           id="name"
//           placeholder="name"
//           />
//            {/* gender */}
//           <label htmlFor="fgender">Gender</label>
//            <Input className="border"
// type="text"
// value={formData.gender}
// onChange={handleChange}
// id="gender"
// placeholder="gender"
//            />
//            {/* age */}
//            <label htmlFor="age">Age</label>
// type="text"
// value={formData.age}
// onChange={handleChange}
// id="age"
// placeholder="age"
//            />
//            <br />
//           {/* sumbit */}
//         <input className="border" type="submit" />
//         </FormControl>
//       </Center>
//     </>
<br />;
