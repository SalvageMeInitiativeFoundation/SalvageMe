import axios from "axios";
import React,{useEffect, useState,useContext } from "react";
import styled from "styled-components";
import DeliveryModal from "./DeliveryModal";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext/userContext";
import {capitalizeWords} from "../utils/constants";


function DonorBook({donation}) {
  const { setRequestQty, requestQty, user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const alreadyRequested = requestQty && requestQty.includes(donation._id);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleConfirm = async (deliveryLocation) => {
    // compose request payload and call API
    const requestData = {
      recipient_id: user?._id,
      book_id: donation._id,
      delivery_location: deliveryLocation,
      delivery_latitude: 0.1245,
      delivery_longitude: 1.2346,
    };
    try {
      setIsSubmitting(true);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/request/createRequest`, requestData, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      if (res.status === 200) {
        toast.success("Book Request Successful", { position: toast.POSITION.TOP_RIGHT });
        // update context request list
        setRequestQty((prev) => (prev ? [...prev, donation._id] : [donation._id]));
        setShowModal(false);
      }
    } catch (error) {
      setShowModal(false);
      const msg = error?.response?.data?.message || "Could not request book, try again";
      toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
      console.error("Error occurred while requesting book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="DonorBook" style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}>
      <div className="DonorBookImageWrap" style={{ padding: '12px' }}>
        <img className="DonorBookCover" src={donation.image} alt={`Cover of ${donation.title}`} />
      </div>
      <div className="DonorBookBody">
        <h4 className="DonorBookTitle">{donation.title}</h4>
        <p className="DonorBookMeta">{donation.category ? capitalizeWords(donation.category) : "General"} • {donation.level ? donation.level.toUpperCase() : "N/A"}</p>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:15, width:'100%'}}>
          <button
            className={alreadyRequested ? "DonorBookButtonRequested" : "DonorBookButton"}
            type="button"
            onClick={openModal}
            disabled={alreadyRequested}
            style={{ width: '100%' }}
          >
            {alreadyRequested ? 'Requested' : 'Request'}
          </button>
        </div>
      </div>

      {showModal && (
        <DeliveryModal
          donation={donation}
          onClose={closeModal}
          onConfirm={handleConfirm}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default DonorBook;
