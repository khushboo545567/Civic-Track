import React from "react";
import Card from "../components/card";
function HomePage() {
  return (
    <div className=" px-20 py-15">
      <ul className="flex flex-wrap gap-5">
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
      </ul>
    </div>
  );
}
export default HomePage;
