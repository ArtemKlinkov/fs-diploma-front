import { createContext } from "react";

const HallContext = createContext(
  {
    halls: [],
    show: false,
    deletingHall: {id: null, name: ""}
  }
);

export default HallContext;