export interface Stamp {
  type: "出勤" | "休憩開始" | "休憩終了" | "退勤";
  dateTime: string; //ex) "08:08"
}

export const URL = `https://p.secure.freee.co.jp/#home/${new Date().getFullYear()}/${
  new Date().getMonth() + 1
}`;

export const getWorkingStamps = () => {
  let stamps = Array.from(
    document.querySelectorAll(".sw-basic-table .time-clocks")
  ).map((elm) => {
    const type = elm.getElementsByClassName("type")[0].textContent;
    const dateTime =
      elm.getElementsByClassName("datetime")[1].getElementsByTagName("input")[0]
        .value || elm.getElementsByClassName("datetime")[0].textContent;
    console.log(type, dateTime);
    return { type, dateTime } as Stamp;
  });
  return stamps;
};

export const getWorkingMilliSeconces = (stamps: Stamp[]) => {
  let workingTime = 0;
  let prevTime = 0;
  let isWorking = true;

  stamps.forEach((stamp) => {
    const temp = new Date();
    const d = new Date(
      `${temp.getFullYear()}-${temp.getMonth() + 1}-${temp.getDate()} ${
        stamp.dateTime
      }`
    );
    if (stamp.type === "休憩開始" || stamp.type === "退勤") {
      workingTime += d.getTime() - prevTime;
      if (stamp.type === "退勤") {
        isWorking = false;
      }
    }
    prevTime = d.getTime();
  });

  let last = stamps[stamps.length - 1];
  isWorking = last.type === "休憩終了" || last.type === "出勤";
  if (isWorking) {
    workingTime += Date.now() - prevTime;
  }

  return workingTime;
};
