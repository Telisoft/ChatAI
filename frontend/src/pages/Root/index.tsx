import React from "react";
import { Redirect } from "react-router-dom";

const Index = (props: any) => {
  return (
    <div>
      <Redirect to="/assistant" />
    </div>
  );
};

export default Index;
