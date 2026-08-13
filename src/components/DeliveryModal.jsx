import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";


const DeliveryModal = ({ donation, onClose, onConfirm, isSubmitting }) => {
  const [deliveryLocation, setDeliveryLocation] = useState("");

  return (
    <Modal close={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Request "{donation.title}"</h3>
          <p style={{ margin: "6px 0", color: "#4b4b4b" }}>
            Delivery is free — we'll deliver to your provided location.
          </p>
        </ModalHeader>

        <ModalContent>
          <Section>
            <label>Previous recipients</label>
            {donation.listRecievers && donation.listRecievers.length > 0 ? (
              <PrevList>
                {donation.listRecievers.map((r, i) => (
                  <PrevItem key={i}>
                    <strong>{r.username || r.recipient_id}</strong>
                    <span style={{ color: "#777", marginLeft: 8 }}>{r.status || "N/A"}</span>
                  </PrevItem>
                ))}
              </PrevList>
            ) : (
              <div style={{ color: "#666" }}>No previous recipients</div>
            )}
          </Section>

          <Section>
            <label>Condition</label>
            <div style={{ color: "#333", fontWeight: 700 }}>{donation.condition || "Unknown"}</div>
          </Section>

          <Section>
            <label>Delivery address</label>
            <textarea
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="Enter delivery address"
              rows={3}
            />
          </Section>

          <Actions>
            <button
              className="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose && onClose();
              }}
              type="button"
              style={{ background: "#eee", color: "#111" }}
            >
              Cancel
            </button>
            <button
              className="button"
              onClick={() => onConfirm && onConfirm(deliveryLocation)}
              type="button"
              disabled={isSubmitting || !deliveryLocation}
            >
              {isSubmitting ? "Requesting..." : "Confirm Request"}
            </button>
          </Actions>
        </ModalContent>
      </ModalBox>
    </Modal>
  );
};

export default DeliveryModal;

const ModalBox = styled.div`
  width: 680px;
  max-width: calc(100% - 40px);
  margin: 80px auto;
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  @media (max-width: 640px) {
    width: calc(100% - 24px);
    margin: 40px 12px;
    padding: 14px;
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const ModalContent = styled.div`
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

const Section = styled.div`
  & label{display:block; font-weight:700; margin-bottom:6px}
  & input, & textarea { width:100%; padding:10px; border-radius:8px; border:1px solid rgba(0,0,0,0.12); box-sizing:border-box }
`;

const PrevList = styled.div`
  display:flex; flex-direction:column; gap:6px;
`;

const PrevItem = styled.div`
  display:flex; align-items:center; font-size:14px;
`;

const Actions = styled.div`
  display:flex; gap:8px; justify-content:flex-end; margin-top:6px;
`;
