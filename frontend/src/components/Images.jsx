import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Images.css";

const fetchImageAPI = async function () {
  const res = await axios.get("http://localhost:8082/images");
  console.log(res);
  return res.data;
};

export const Images = () => {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryFn: fetchImageAPI,
    queryKey: ["images"],
  });

  return (
    <div className="imageContainer">
      {data?.map((image) => {
        return (
          <img className="allImages" src={image.url} alt="generated image" />
        );
      })}
    </div>
  );
};
