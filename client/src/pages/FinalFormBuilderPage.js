import React from "react";
import Navbar from '../components/Navbar';
import FinalFormBuilder from '../builders/FinalFormBuilder';

function FinalFormBuilderPage() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container mx-auto px-4">
        <FinalFormBuilder></FinalFormBuilder>
      </div>
    </React.Fragment>
  );
}

export default FinalFormBuilderPage;
