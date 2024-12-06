import React, { useEffect, useRef, useState } from 'react';
import 'gridstack/dist/gridstack.min.css';
import MyWidget from './MyWidget';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const GridstackComponent = () => {
  const gridRef = useRef(null);
  const [widgets, setWidgets] = useState([
    { id: 1, x: 0, y: 0, width: 2, height: 2, content: "Custom Widget 1" },
    { id: 2, x: 2, y: 0, width: 1, height: 1, content: "Custom Widget 2" },
  ]);

  useEffect(() => {
    if (gridRef.current) {
      // Dynamically import GridStack on the client side
      import('gridstack').then(({ GridStack }) => {
        const grid = GridStack.init({}, gridRef.current);

        // Sync widget positions when GridStack changes
        grid.on('change', (event, items) => {
          setWidgets((prevWidgets) =>
            prevWidgets.map((widget) => {
              const item = items.find((i) => i.id === widget.id);
              return item
                ? { ...widget, x: item.x, y: item.y, width: item.w, height: item.h }
                : widget;
            })
          );
        });

        // Clean up the grid instance when the component unmounts
        return () => grid.destroy();
      });
    }
  }, []);

//   const addWidget = () => {
//     const newWidget = {
//       id: Date.now(),
//       x: 0,
//       y: 0,
//       width: 2,
//       height: 2,
//       content: `New Widget ${widgets.length + 1}`,
//     };
//     setWidgets([...widgets, newWidget]);
//   };

  return (
    <div>
      {/* <button onClick={addWidget}>Add Widget</button> */}
      <div ref={gridRef} className="grid-stack">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="grid-stack-item shadow-lg border-green-300 border-2"
            gs-x={widget.x}
            gs-y={widget.y}
            gs-width={widget.width}
            gs-height={widget.height}
            data-id={widget.id}
          >
            <div className="grid-stack-item-content">
              <MyWidget content={widget.content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridstackComponent;
