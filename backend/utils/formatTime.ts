const formatTimestamp = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB").replace(/\//g, "-");
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const time = `${hours.toString().padStart(2, "0")}.${minutes}${ampm}`;
  return `${date}_${time}`;
};
export default formatTimestamp;
module.exports = formatTimestamp;
