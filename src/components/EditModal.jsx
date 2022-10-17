import { useState, useEffect } from "react";
import { Layout, Modal, Image, Input, Space } from "antd";
const { Sider, Content } = Layout;

const EditModal = ({ id, title, open, onClose, url, boxCount }) => {
  const [twoTextBoxes, setTwoTextBoxes] = useState({
    text0: "",
    text1: "",
  });
  const [textBoxes, setTextBoxs] = useState([]);
  const [imgUrl, setImgUrl] = useState(url);

  const handleChange = (e) => {
    const value = e.target.value;

    if (boxCount === 2)
      setTwoTextBoxes({ ...twoTextBoxes, [e.target.name]: value });
    else if (boxCount > 2)
      setTextBoxs([...textBoxes, { [e.target.name]: value }]);
  };

  // const getInputParameters = () => {
  //   return {
  //     template_id: id,
  //     text0: textBoxs.text0,
  //     text1: textBoxs.text1,
  //     text2: textBoxs.text2,
  //     text3: textBoxs.text3,
  //     text4: textBoxs.text4,
  //     username: Authorization.username,
  //     password: Authorization.password,
  //   };
  // };

  // useEffect(() => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //     },
  //     body: new URLSearchParams(getInputParameters()),
  //   };
  //   fetch("https://api.imgflip.com/caption_image", requestOptions).then(
  //     (response) => console.log(response)
  //   );
  // }, []);

  const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  const Authorization = {
    username: "totaya7373",
    password: "totaya7373",
  };

  return (
    <Modal
      id={id}
      title={title}
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width={1000}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let params;
          if (boxCount <= 2) {
            params = {
              template_id: id,
              text0: twoTextBoxes.text0,
              text1: twoTextBoxes.text1,
              username: Authorization.username,
              password: Authorization.password,
            };
          } else if (boxCount > 2) {
            params = {
              template_id: id,
              "boxes[0][text]":
                textBoxes[0].text0 === undefined ? "" : textBoxes[0].text0,
              "boxes[1][text]":
                textBoxes[1].text1 === undefined ? "" : textBoxes[1].text1,
              "boxes[2][text]":
                textBoxes[2].text2 === undefined ? "" : textBoxes[2].text2,
              // "boxes[3][text]":
              //   textBoxes[3].text3 === undefined ? "" : textBoxes[3].text3,
              username: Authorization.username,
              password: Authorization.password,
            };
          }
          // console.log(
          // `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
          // textBoxes[0].text0
          // );
          const response = await fetch(
            `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
          );
          // .then((response) => {
          // setImgUrl(response.data.url);
          // });
          const json = await response.json();
          setImgUrl(json.data.url);
        }}
      >
        <Layout>
          <Sider>
            <Space direction="vertical">
              {[...Array(boxCount)].map((tb, i) => (
                <Input
                  name={`text${i}`}
                  placeholder={`Text box ${i + 1} `}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </Space>
            <button type="submit">Preview</button>
          </Sider>
          <Content>
            <Image width={500} src={imgUrl} />
          </Content>
        </Layout>
      </form>
    </Modal>
  );
};

export default EditModal;
