import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await fetch(`/api/v1/cars/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetail();
  }, [id]);

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>
        {car.name} - {car.model}
      </h2>
      <img src={car.image} alt={car.name} />
      <p>Price: {car.price}</p>
      <p>Description: {car.description}</p>
    </div>
  );
};

export default CarDetail;
