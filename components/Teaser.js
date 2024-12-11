import { storyblokEditable } from "@storyblok/react";

const Teaser = ({ blok }) => {
  return <div className="py-4 mx-10 mb-10 border-2 border-transparent border-b-black"><h2 className="flex justify-start px-5 mb-0 mb-10 text-4xl font-bold" {...storyblokEditable(blok)}>{blok.headline}</h2></div>
};

export default Teaser;
