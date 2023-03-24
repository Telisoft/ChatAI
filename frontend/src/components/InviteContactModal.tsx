import React, { useEffect, useState } from "react";
import { Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface DataTypes {
  phoneNumber: string | null;
}
interface InviteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: any) => void;
}
const InviteContactModal = ({
  isOpen,
  onClose,
  onInvite,
}: InviteContactModalProps) => {
  /*
  data input handeling
  */
  const [data, setData] = useState<DataTypes>({
    phoneNumber: null,
  });
  useEffect(() => {
    setData({
      phoneNumber: null,
    });
  }, []);

  const onChangeData = (field: "phoneNumber", value: string) => {
    let modifiedData: DataTypes = { ...data };
    if (value === "") {
      modifiedData[field] = null;
    } else {
      modifiedData[field] = value;
    }
    setData(modifiedData);
  };

  /*
  validation
  */
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    if (data.phoneNumber !== null) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data]);
  return (
    <Modal isOpen={isOpen} toggle={onClose} tabIndex={-1} centered scrollable>
      <ModalHeader className="modal-title-custom" toggle={onClose}>
        Add Contact
      </ModalHeader>
      <ModalBody className="p-4">
        <Form>
          {/*<div className="mb-3">
            <Label htmlFor="AddContactModalemail-input" className="form-label">
              Email
            </Label>
            <Input
              type="email"
              className="form-control"
              id="AddContactModalemail-input"
              placeholder="Enter Email"
              value={data["email"] || ""}
              onChange={(e: any) => {
                onChangeData("email", e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="AddContactModalname-input" className="form-label">
              First Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="AddContactModalname-input"
              placeholder="Enter First Name"
              value={data["firstName"] || ""}
              onChange={(e: any) => {
                onChangeData("firstName", e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="AddContactModalname-input" className="form-label">
              Last Name
            </Label>
            <Input
              type="text"
              className="form-control"
              id="AddContactModalname-input"
              placeholder="Enter Last Name"
              value={data["lastName"] || ""}
              onChange={(e: any) => {
                onChangeData("lastName", e.target.value);
              }}
            />
          </div>*/}

          <div className="mb-3">
            <Label htmlFor="AddContactModalname-input" className="form-label">
              Phone Number
            </Label>
            <Input
              type="number"
              className="form-control"
              id="AddContactModalname-input"
              placeholder="Enter Phone Number"
              value={data["phoneNumber"] || ""}
              onChange={(e: any) => {
                onChangeData("phoneNumber", e.target.value);
              }}
            />
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="link" className="btn" onClick={onClose}>
          Close
        </Button>
        <Button
          type="button"
          color="primary"
          disabled={!valid}
          onClick={() => onInvite(data)}
        >
          Invite
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InviteContactModal;
