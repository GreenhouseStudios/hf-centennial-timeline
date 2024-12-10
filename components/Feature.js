import { storyblokEditable } from "@storyblok/react";

const Feature = ({ blok, onClick }) => {
  // function showModal() {
  //   console.log("modal");
  // }
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-end mb-1 overflow-hidden shadow-md rounded-2xl w-72 h-96 column feature"
      {...storyblokEditable(blok)}
      style={{
        backgroundImage: `url(${blok.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-2 p-4 overflow-hidden text-left bg-white whitespace-nowrap hover:bg-gray-200 h-1/2">
        <p className="text-2xl font-bold">{blok.name}</p>
        <p className="text-base">{blok.date}</p>
        <p className="overflow-hidden text-base text-ellipsis">
          {blok.description}
        </p>
      </div>
    </div>
  );
};

export default Feature;
