import * as React from "react";
import { sendToTab } from "../utils/ChromeUtil";

export const WorkingTimeViewer = () => {
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      const response = await sendToTab<string>("get-working-time");
      const milliSec = parseInt(response);
      setHours(Math.floor(milliSec / 1000 / 60 / 60));
      setMinutes(Math.floor((milliSec % (1000 * 60 * 60)) / 1000 / 60));
    })();
  }, []);

  return (
    <div>
      You are working for <span>{hours}</span> hours <span>{minutes}</span>{" "}
      minutes today.
    </div>
  );
};
