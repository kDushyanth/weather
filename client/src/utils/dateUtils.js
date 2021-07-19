export function findTime(unix){
    var date = new Date(unix * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}
export function findDay(unix){
    return  new Date(unix * 1000).toDateString().substring(4,10);
}
export function findDayDate(unix){
    var date = new Date(unix * 1000);
    var part1 = date.toDateString().substring(4,10);
    var hours = date.getHours();
    hours = (Math.floor(hours/10)===0)? "0"+hours:hours;
    var minutes = "0" + date.getMinutes();
    var formattedTime = part1+" "+hours + ':' + minutes.substr(-2);
    
return formattedTime;
}