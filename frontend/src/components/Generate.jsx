import React from "react";
import { useMutation } from "@tanstack/react-query";
import "./Generate.css";

const generateImageAPI = async function () {
  const res = await fetch("http://localhost:8082/generate-image");
  return res.data;
};

export const Generate = () => {
  const mutation = useMutation({
    mutationFn: generateImageAPI,
    mutationKey: ["random"],
  });

  function handleGenerateImage() {
    mutation.mutate();
  }

  console.log(mutation);
  return (
    <div className="genContainer">
      <button type="submit" onClick={handleGenerateImage}>
        Generate Image
      </button>
    </div>
  );
};
