import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import { useService } from "../hooks/useService";
import { PlaceService } from "../services/place.service";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<any>([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState<any>([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const placeService = useService(PlaceService);
  
  useEffect(() => {
    if (!id) {
      return;
    }
    placeService.getPlaceById(id).then(response => {
      setTitle(response.title);
      setAddress(response.address);
      setAddedPhotos(response.photos);
      setDescription(response.description);
      setPerks(response.perks);
      setExtraInfo(response.extraInfo);
      setCheckIn(response.checkIn);
      setCheckOut(response.checkOut);
      setMaxGuests(response.maxGuests);
      setPrice(response.price);
    });
  }, []);

  const inputHeader = (text: string) => {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  const inputDescription = (text: string)=> {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  const preInput = (header: string, description: string) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const savePlace= async (ev: any) =>{
    let token = localStorage.getItem('token')
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await placeService.updatePlace(id, placeData, token);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks', 'select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra info', 'house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
              placeholder="14" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
              placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
              onChange={ev => setMaxGuests(Number(ev.target.value))} />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
              onChange={ev => setPrice(Number(ev.target.value))} />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}