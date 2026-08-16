import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const CONDITION_COLORS = {
  new: { fg: "#0b7a3e", bg: "#e8f7ee", border: "#9ad9b3" },
  used: { fg: "#8a5a00", bg: "#fff4d6", border: "#f2cf80" },
  worn: { fg: "#8b4513", bg: "#fbeadf", border: "#e8c2a7" },
  damaged: { fg: "#9c1c1c", bg: "#fde8e8", border: "#efb1b1" },
  refurbished: { fg: "#0d5ea6", bg: "#e8f2fd", border: "#a9caef" },
};

const getConditionStyle = (condition) => {
  const key = String(condition || "").toLowerCase();
  return CONDITION_COLORS[key] || { fg: "#333", bg: "#f3f4f6", border: "#d1d5db" };
};


const DeliveryModal = ({ donation, onClose, onConfirm, isSubmitting }) => {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryError, setDeliveryError] = useState("");
  const condition = donation.condition || "Unknown";
  const conditionStyle = getConditionStyle(condition);

  const handleDeliveryChange = (e) => {
    const value = e.target.value;
    setDeliveryLocation(value);
    if (value.trim()) {
      setDeliveryError("");
    }
  };

  const handleConfirmClick = () => {
    if (!deliveryLocation.trim()) {
      setDeliveryError("Please enter delivery address.");
      return;
    }
    setDeliveryError("");
    onConfirm && onConfirm(deliveryLocation.trim());
  };

  return (
    <Modal close={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Request "<span style={{ color: "#ff8c00" }}>{donation.title}</span>"</h3>
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
            <ConditionBadge
              style={{
                color: conditionStyle.fg,
                backgroundColor: conditionStyle.bg,
                borderColor: conditionStyle.border,
              }}
            >
              {condition}
            </ConditionBadge>
          </Section>

          <Section>
            <label>Delivery address</label>
            <textarea
              value={deliveryLocation}
              onChange={handleDeliveryChange}
              placeholder="Enter delivery address"
              rows={3}
            />
            {deliveryError ? <InlineError role="alert">{deliveryError}</InlineError> : null}
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
              onClick={handleConfirmClick}
              type="button"
              disabled={isSubmitting}
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
  & textarea:focus {
    outline: none;
    border-color: #ff8c00;
    box-shadow: 0 0 0 2px rgba(255, 140, 0, 0.18);
  }
`;

const PrevList = styled.div`
  display:flex; flex-direction:column; gap:6px;
`;

const PrevItem = styled.div`
  display:flex; align-items:center; font-size:14px;
`;

const Actions = styled.div`
  display:flex; gap:8px; margin-top:6px;
  .button {
    flex: 1;
    width: 100%;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ConditionBadge = styled.span`
  display: inline-block;
  font-weight: 700;
  border: 1px solid;
  border-radius: 999px;
  padding: 6px 12px;
  text-transform: capitalize;
`;

const InlineError = styled.p`
  margin: 6px 0 0;
  color: #c62828;
  font-size: 0.9rem;
`;
