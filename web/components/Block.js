import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import client from "../client";

function Block(props) {
  const { blocks } = props;

  if (!blocks) {
    console.error("Missing blocks");
    return null;
  }

  return <BlockContent blocks={blocks} {...client.config()} />;
}

// About.propTypes = {
//   blocks: PropTypes.arrayOf(PropTypes.object)
// }

export default Block;
