import React, { useState } from "react";

function ControllerHeader(props) {
  const [isOpened, setIsOpened] = useState(true);
  const {title} = props;
  return(
    <header className={isOpened ? "conf-step__header conf-step__header_opened" : "conf-step__header conf-step__header_closed"} onClick={() => setIsOpened(prevState => !prevState)}>
      <h2 className="conf-step__title">{title}</h2>
    </header>
  );
}

export default ControllerHeader;