function timeDiffCalc(dateNow) {
    let dateFuture=Date.parse(new Date());
    dateNow=Date.parse(dateNow);
    //console.log(dateFuture);
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    //console.log(diffInMilliSeconds);
    // calculate diffr
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    //console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    //console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    //console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
      difference = (days === 1) ? `${days} day ago ` : `${days} days ago `;
    }
    else if(hours >1){
    difference = (hours === 0 || hours === 1) ? `${hours} hour ago ` : `${hours} hours ago `;
    }
    else if(minutes > 1){
    difference = (minutes === 0 || hours === 1) ? `${minutes} minute ago` : `${minutes} minutes ago`; 
    }
    else
    {
        difference="Just Now";
    }

    return difference;
  }

  export default timeDiffCalc;