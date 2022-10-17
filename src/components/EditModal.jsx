import { useState } from "react";
import { Layout, Modal, Image, Input, Space, Button } from "antd";
const { Sider, Content } = Layout;

const EditModal = ({ id, title, open, onClose, url, boxCount }) => {
  const [textBoxes, setTextBoxes] = useState({});
  const [imgUrl, setImgUrl] = useState(url);

  const handleChange = (e) => {
    const value = e.target.value;
    setTextBoxes({ ...textBoxes, [e.target.name]: value });
  };

  const handleClose = (e) => {
    setImgUrl(url);
    onClose();
  };

  const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  const generateTextBoxes = (boxCount) => {
    for (let i = 0; i < boxCount; i++) {
      setTextBoxes({
        ...textBoxes,
        ["text" + i]: "",
      });
    }
  };

  // Thêm boxes vào params dựa trên boxCount
  const generateParamsTextBoxes = (boxCount) => {
    let params = {
      template_id: id,
      username: Authorization.username,
      password: Authorization.password,
    };
    for (let i = 0; i < boxCount; i++) {
      params[`boxes[${i}][text]`] = Object.values(textBoxes)[i];
    }
    return params;
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
      onCancel={(e) => handleClose(e)}
      width={1000}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          generateTextBoxes(boxCount);
          const params = generateParamsTextBoxes(boxCount);
          console.log(params);

          const response = await fetch(
            `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
          );

          const json = await response.json();
          setImgUrl(json.data.url);
        }}
      >
        <Layout>
          <Sider>
            <Space direction="vertical">
              {[...Array(boxCount)].map((_, i) => (
                <Input
                  name={`text${i}`}
                  placeholder={`Text box ${i + 1} `}
                  onChange={(e) => handleChange(e)}
                />
              ))}
              <Button type="primary" htmlType="submit">
                Preview
              </Button>
            </Space>
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
