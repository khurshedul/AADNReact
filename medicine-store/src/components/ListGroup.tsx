//import { MouseEvent } from "react";

import { useState } from "react";
interface Props {
  items: string[];
  header: string;
  onSelectedChanged: (item: string) => void;
}
function ListGroup({ items, header, onSelectedChanged }: Props) {
  //const items = ["BD", "India", "Etc"];
  // let selectedIndex = -1;
  //hook

  const [selectedIndex, setSelectedIndex] = useState(-1);
  //const handleClick=(event: MouseEvent) => console.log(event);
  return (
    <>
      <h1>{header}</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index), onSelectedChanged(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
