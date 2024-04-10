export const format = (seconds) => {
  if (isNaN(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
};

// Capitalize each word in a string
export const capitalize = (string) => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const convertTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export const convertDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const convertTimeWithHours = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  if (minutes < 10) {
    return `${hours}h. 0${minutes} min.`;
  }
  if (hours === 0) {
    return `${minutes} min.`;
  }
  return `${hours}h. ${minutes} min.`;
};
