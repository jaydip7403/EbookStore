// import React, { useContext, useEffect } from "react";
// import { AuthContext } from "../App";
// import { toast } from "react-hot-toast";
// import { Button } from "./ui/button";

// const About = () => {
//   const [user, SetUser] = useContext(AuthContext);

//   return (
//     <>
//       <h1>
//         Welcome to ebookStore , a project designed for educcational exploration and learning . Please note that this website 
//         is a part of study project and not a fully operational commercial plateform .While the eBook showcased here are not 
//         available for purchase or download.
//       </h1>
//       <pre>{JSON.stringify(user, null, 2)}</pre>
//       {/* <Button onClick={() => toast.error("hello")}>click me</Button> */}
//     </>
//   );
// };

// export default About;

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const About = () => {
  const [user, SetUser] = useContext(AuthContext);

  const containerStyle = {
    textAlign: "center",
    padding: "20px",
  };

  const hrStyle = {
    width: "50%",
    margin: "20px auto",
  };

  const nameStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const contentStyle = {
    fontSize: "18px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={nameStyle}>Jaydeep Parmar</h1>
      <hr style={hrStyle} />
      <p style={contentStyle}>
        Welcome to ebookStore, a project designed for educational exploration and learning. Please note that this website is a part of a study project and not a fully operational commercial platform. While the eBooks showcased here are not available for purchase or download.
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <Button onClick={() => toast.error("hello")}>click me</Button> */}
    </div>
  );
};

export default About;

