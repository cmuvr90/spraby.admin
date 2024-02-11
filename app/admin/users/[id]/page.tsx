import React from "react";
import User from "@/theme/templates/User";
import {PageParams} from "@/types";

export default function Page(props: PageParams) {
  return <User {...props}/>
}
