import moment from "moment";
import { extractTime } from "@polkadot/util";

export function time(time) {
  if (!time) {
    return "Unknown";
  }
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
}

export function timeDuration(time, roughly = false) {
  if (!time) {
    return "Unknown time";
  }
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ",
      s: (number) => number + " secs ago ",
      ss: "%d secs ago",
      m: "1 min ago",
      mm: "%d mins ago",
      h: "1 hour ago ",
      hh: "%d hours ago",
      d: "1 day ago",
      dd: "%dd ago",
      M: "1 month ago ",
      MM: "%d months ago ",
      y: "1 year ago",
      yy: "%d years ago",
    },
  });
  const now = moment();
  if (!now.isAfter(time)) {
    return moment(time).fromNow();
  }
  let ss = now.diff(time, "seconds");
  let mm = now.diff(time, "minutes");
  let hh = now.diff(time, "hours");
  let dd = now.diff(time, "days");
  if (dd) {
    hh %= 24;
    if (hh && !roughly) {
      return `${dd} day${dd > 1 ? "s" : ""} ${hh} hr${hh > 1 ? "s" : ""} ago`;
    }
    return `${dd} day${dd > 1 ? "s" : ""} ago`;
  }
  if (hh) {
    mm %= 60;
    if (mm && !roughly) {
      return `${hh} hr${hh > 1 ? "s" : ""} ${mm} min${mm > 1 ? "s" : ""} ago`;
    }
    return `${hh} hr${hh > 1 ? "s" : ""} ago`;
  }
  if (mm) {
    ss %= 60;
    if (ss && !roughly) {
      return `${mm} min${mm > 1 ? "s" : ""} ${ss} sec${ss > 1 ? "s" : ""} ago`;
    }
    return `${mm} min${mm > 1 ? "s" : ""} ago`;
  }
  return `${ss} sec${ss > 1 ? "s" : ""} ago`;
}

export function timeRemain(ms) {
  const { days, hours, minutes } = extractTime(ms);

  if (days > 30) {
    return `${days}days`;
  }

  return [
    days ? `${days}days` : "",
    hours ? `${hours}hrs` : "",
    minutes ? `${minutes}mins` : "",
  ].join(" ");
}
