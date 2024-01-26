import dayjs from "dayjs";

export default function getDates(start, end) {
  // eslint-disable-next-line no-var
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
    arr.push(new Date(dt));
  }
  return arr;
};