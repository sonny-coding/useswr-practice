import React, { useState } from "react";
import Users from "@/components/Users";

const Home = () => {
  const [count, setCount] = useState(0);
  return <Users count={count} setCount={setCount} />;
};

export default Home;
