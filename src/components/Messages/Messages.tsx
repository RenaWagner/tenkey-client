import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectMessage } from "../../store/message/selectors";

export default function Messages() {
  const message = useSelector(selectMessage);

  return (
    <Alert
      className="m-0 p-0"
      variant={message.variant}
      dismissible={message.dismissable}
    >
      {message.text}
    </Alert>
  );
}
