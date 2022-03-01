import * as React from "react";
import { sendToTab } from "../utils/ChromeUtil";

export const WorkingTimeViewer = () => {
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    (async () => {
      const response = await sendToTab<string>("get-working-time");
      const milliSec = parseInt(response);
      setHours(Math.floor(milliSec / 1000 / 60 / 60));
      setMinutes(Math.floor((milliSec % (1000 * 60 * 60)) / 1000 / 60));

      const remaining = 8 * 60 * 60 * 1000 - milliSec;
      const endDate = new Date(Date.now() + remaining);
      setEndDate(endDate);
    })();
  }, []);

  return (
    <div>
      You are working for <span style={{ fontWeight: "bold" }}>{hours}</span>{" "}
      hours <span style={{ fontWeight: "bold" }}>{minutes}</span> minutes today.
      Your finish time is{" "}
      <span style={{ fontWeight: "bold" }}>
        {endDate.getHours().toString().padStart(2, "0")}:
        {endDate.getMinutes().toString().padStart(2, "0")}
      </span>
    </div>
  );
};
