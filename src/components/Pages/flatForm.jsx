import "../../styles/flatform.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FlatForm = () => {
  const navigate = useNavigate();
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
    // console.log("valid", value);
    // console.log("valid", e.target);
    // console.log("valid", id);
  };
  const [validate, setValidate] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setValidate(false);
    }
    axios
      .post("https://apartmentauth.herokuapp.com/flat", formData)
      .then(() => {
        alert("Flat added succussfully");
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
        navigate("/flat");
      });
  };
  return (
    <div className="overall">
      <div className="parent">
        <p> Add flat</p>
        <form onSubmit={handleSubmit}>
          <input
            className="border"
            type="text"
            value={formData.block}
            onChange={handleChange}
            id="block"
            placeholder="Block"
          />
          <br />
          {/* vaidation */}
          {validate ? (
            ""
          ) : (
            <label className="validRes">Block feild should not be empty</label>
          )}
          <input
            className="border"
            type="text"
            value={formData.flat_number}
            onChange={handleChange}
            id="flat_number"
            placeholder="Flat Number"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label className="validRes">
              Flat Number feild should not be empty
            </label>
          )}
          <input
            className="border"
            type="text"
            value={formData.type}
            onChange={handleChange}
            id="type"
            placeholder="Owner / Tenant"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label className="validRes">Type feild should not be empty</label>
          )}
          <input
            className="border"
            type="text"
            value={formData.image}
            onChange={handleChange}
            id="image"
            placeholder="Image"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label className="validRes">Please enter valid Url</label>
          )}
          <input
            className="border"
            type="text"
            value={formData.residents}
            onChange={handleChange}
            id="residents"
            placeholder="No of residence"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label className="validRes">
              Resident feild should not be emply
            </label>
          )}
          <input
            className="border"
            type="text"
            value={formData.name}
            onChange={handleChange}
            id="name"
            placeholder="Name"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label className="validRes">Name feild should not be emply</label>
          )}
          <input
            className="border"
            type="text"
            value={formData.gender}
            onChange={handleChange}
            id="gender"
            placeholder="Gender"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label htmlFor="flat-Number" className="validRes">
              Gender feild should not be emply
            </label>
          )}
          <input
            className="border"
            type="text"
            value={formData.age}
            onChange={handleChange}
            id="age"
            placeholder="Age"
          />
          <br />
          {validate ? (
            ""
          ) : (
            <label htmlFor="flat-Number" className="validRes">
              Age feild should not be emply
            </label>
          )}

          <br />
          <input className="btnSumit" type="submit" />
        </form>
      </div>
    </div>
  );
};
