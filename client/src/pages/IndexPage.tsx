import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import { useService } from "../hooks/useService";
import { PlaceService } from "../services/place.service";
import { Place } from "models/place.model";

export default function IndexPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const placeService = useService(PlaceService);

  useEffect(() => {
    placeService.getAllPlaces().then(response => {
      setPlaces(response);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map((place,key) => (
        <Link to={'/place/' + place._id} key={key} className="bg-gray-100 p-4 rounded-2xl mb-5 shadow-lg">
          <img src={place.photo} alt="photo" />
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}
