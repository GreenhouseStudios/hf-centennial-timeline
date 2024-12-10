import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from "react";
import "./Grid.css";
import { useState } from "react";

const Grid = ({ blok }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBlok, setModalBlok] = useState(null);
  const [modalBlokUid, setModalBlokUid] = useState(null);

  function showModal(blok, blokUid) {
    setModalOpen(true);
    setModalBlok(blok);
    setModalBlokUid(blokUid);
  }

  function closeModal() {
    setModalOpen(false);
    setModalBlok(null);
    setModalBlokUid(null);
  }

  return (
    <main>
      <div
        className="h-screen gap-4 px-20 py-4 masonry-grid "
        {...storyblokEditable(blok)}
      >
        {blok.columns.map((nestedBlok) => (
          <StoryblokComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
            onClick={() => showModal(nestedBlok, nestedBlok._uid)}
            className="grid-item"
          />
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="flex flex-col items-center justify-center gap-4 modal">
            <div className="modal-content" style={{ backgroundImage: `url(${modalBlok.img})` , backgroundSize: 'cover', backgroundPosition: 'center', height: `${modalBlok.height}px`}}>
              <h1>{modalBlok.name}</h1>
              <p>{modalBlok.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Grid;
