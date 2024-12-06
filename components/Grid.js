import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import 'gridstack/dist/gridstack.min.css';
import React, { useEffect, useRef } from "react";
import GridstackComponent from "./GridstackTile";

const Grid = ({ blok }) => {

  return (
    // <div ref={gridRef} className="grid grid-cols-3 grid-stack" {...storyblokEditable(blok)}>
   
    // </div>
    <GridstackComponent />
  );
};

export default Grid;
