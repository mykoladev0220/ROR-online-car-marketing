import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, selectCars } from "../../redux/carsSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Cars = () => {
  const dispatch = useDispatch();
  const { cars, isLoading } = useSelector(selectCars);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const [message, setMessage] = useState(location?.state?.message || "");
  const navigate = useNavigate();
  const [carouselItemsPerPage, setCarouselItemsPerPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setCarouselItemsPerPage(3);
      } else {
        setCarouselItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - carouselItemsPerPage);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + carouselItemsPerPage);
  };

  const renderCars = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + carouselItemsPerPage - 1;
    return cars.slice(startIndex, endIndex + 1).map((car) => (
      <li key={car.id} className="w-[400px] h-[400px] mt-10 shadow">
        <Link to={`/detail/${car.id}`}>
          <img
            src={car.photo}
            alt={car.name}
            className="w-[200px] h-[200px] mx-auto my-4"
          />
          <div className="text-center">
            <p>
              {car.name} - {car.model}
            </p>
          </div>
          <div className="flex items-center justify-center mt-10 gap-6">
            <p>{car.description}</p>
          </div>
        </Link>
        <div className="flex items-center justify-center mt-10 gap-6 text-gray-500">
          <AiFillGithub size={30} />
          <AiFillFacebook size={30} />
          <AiFillInstagram size={30} />
          <AiFillLinkedin size={30} />
        </div>
      </li>
    ));
  };

  if (isLoading) {
    return (
      <div className="text-[#96bf01] text-2xl text-center">Loading...</div>
    );
  }

  return (
    <div className="h-screen w-full">
      {message && (
        <p className="text-center text-green-600 text-2xl">{message}</p>
      )}
      <h1 className="font-bold text-[30px] flex items-center justify-center tracking-widest">
        LATEST MODELS
      </h1>
      <p className="text-gray-500 text-[15px] flex items-center justify-center mb-10">
        Please select a renting car Model
      </p>

      <div className="flex justify-center items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-[#96bf01] rounded-r-full lg:mr-6 lg:pl-10 z-50"
        >
          <BsCaretLeft size={50} className="text-white" />
        </button>
        <ul className="flex justify-center items-center w-20 lg:w-full m-0">
          {renderCars()}
        </ul>
        <button
          onClick={handleNext}
          disabled={currentIndex >= cars.length - carouselItemsPerPage}
          className="bg-[#96bf01] rounded-l-full ml:2 pr:4 lg:ml-6 lg:pr-10"
        >
          <BsCaretRight size={50} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Cars;