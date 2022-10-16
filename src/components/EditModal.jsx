import { Modal, Image } from "antd";

const EditModal = ({ title, open, onClose, url }) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width={1000}
    >
      <Image width={500} src={url} />
    </Modal>
  );
};

export default EditModal;
