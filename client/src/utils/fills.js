import { findDay,findDayDate } from "./dateUtils";
export function fillOverview(daily){
    let description=[], urls=[],tempmin=[],tempmax=[],labels = [];
            for(let i=0;i<daily.daily.length;i++){
                urls.push(`http://openweathermap.org/img/wn/${daily.daily[i].weather[0].icon}@2x.png`);
                description.push(daily.daily[i].weather[0].description);
                tempmin.push(daily.daily[i].temp.min);
                tempmax.push(daily.daily[i].temp.max);
                labels.push(findDay(daily.daily[i].dt));
            }
           
            return {tempmin,tempmax,description,urls,labels}
  }
  export function fillDailyF(daily){
    let temp = [],labels = [], wind = [],humidity=[];
    for(let i=0;i<daily.daily.length;i++){
        temp.push(daily.daily[i].temp.day);
        wind.push(daily.daily[i].wind_speed);
        humidity.push(daily.daily[i].humidity);
        labels.push(findDay(daily.daily[i].dt));
    }
    return {temp,labels,wind,humidity};
  }
  export function fillHourlyF(hourly){
    let temp = [],labels = [], wind = [],humidity=[];
    for(let i=0;i<hourly.hourly.length;i++){
        temp.push(hourly.hourly[i].temp);
        wind.push(hourly.hourly[i].wind_speed);
        humidity.push(hourly.hourly[i].humidity);
        labels.push(findDayDate(hourly.hourly[i].dt));
    }
    return {temp,labels,wind,humidity};
  }