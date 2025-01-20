"use client";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import prism from "prismjs";
const RenderText = ({ content }: { content: string }) => {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return <div>{parse(content)}</div>;
};

export default RenderText;
