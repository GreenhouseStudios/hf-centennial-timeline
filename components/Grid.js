import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import React from "react";
import "./Grid.css";
import { useState } from "react";
import { render } from "storyblok-rich-text-react-renderer";

const Grid = ({ blok }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBlok, setModalBlok] = useState(null);
  const [modalBlokUid, setModalBlokUid] = useState(null);

  function showModal(blok, blokUid) {
    setModalOpen(true);
    setModalBlok(blok);
    setModalBlokUid(blokUid);
    console.log(blok);
  }

  function closeModal() {
    setModalOpen(false);
    setModalBlok(null);
    setModalBlokUid(null);
  }

  function RichText( document ) {
    // document is the rich text object you receive from Storyblok,
    // in the form { type: "doc", content: [ ... ] }
    return <div>{render(document)}</div>;
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
          <div className="flex flex-col items-center justify-start gap-4 overflow-scroll modal">
            <div
              className="flex flex-col justify-center gap-5 px-24 pt-32 text-left pb-96 modal-content"
              style={{
                backgroundImage: `url(${modalBlok.img})`,
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-2xl font-bold text-white ">
                {modalBlok.name}
              </h1>
              <p className="text-2xl font-bold text-white ">
                {modalBlok.description}
              </p>
            </div>
            <div
              style={{ height: "3000px" }}
              className="flex flex-col justify-center gap-5 px-24 pt-32 text-center pb-96 modal-content"
            >
              <h1 className="text-2xl font-bold text-black">
                Title of the Event
              </h1>
              <p className="text-xl text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                molestie, neque non scelerisque ultricies, nisl dolor aliquet
                lectus, nec pulvinar nisl nisi eu diam. Sed in semper nisi.
                Maecenas euismod, nisl eu ultricies ultrices, nunc nisi
                tincidunt nisi, in ultricies nisl nisi eu diam. Sed in semper
                nisi. Maecenas euismod, nisl eu ultricies ultrices, nunc nisi
              </p>
              <img src={modalBlok.img} alt="img" className="w-full" />
              {modalBlok.content.map((content, index) => (
                RichText(content.body)
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Grid;
