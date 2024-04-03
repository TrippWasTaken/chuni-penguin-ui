import React from "react";
import { test } from "./actions";

export default function Aime() {
  const aimeUsers = test().then((test) => console.log(test));
  return <div>Aime</div>;
}
