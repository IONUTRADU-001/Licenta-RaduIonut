import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import { useService } from "../hooks/useService";
import { BookingService } from "../services/booking.service";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const bookingService = useService(BookingService);

  useEffect(() => {
    if (id) {
      bookingService.getAllBookings().then(response => {
        const foundBooking = response.find(({ _id }: { _id: string }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return <></>;
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}