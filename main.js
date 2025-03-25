let inputDay=document.querySelector(".inputs .day input")
let inputMonth=document.querySelector(".inputs .month input")
let inputYear=document.querySelector(".inputs .year input");
let dayLabel=document.querySelector(".inputs .day .type")
let monthLabel=document.querySelector(".inputs .month .type")
let yearLabel=document.querySelector(".inputs .year .type")
let spanDay=document.querySelector(".inputs .day .mistake")
let spanMonth=document.querySelector(".inputs .month .mistake")
let spanYear=document.querySelector(".inputs .year .mistake")
let btn=document.querySelector("button")
let duration=1000;
let theYear,theDay,theMonth;
let months=[1,2,3,4,5,6,7,8,9,10,11,12]
let specialMonths30=[2,4,6,9,11]
let toDay=new Date()
btn.onclick=(()=>{
    theYear=0
    theDay=0
    theMonth=0
    checkType(inputDay.value,inputMonth.value,inputYear.value)
    toadd(theMonth,theDay,theYear)
})
function checkType(day,month,year){
    // check day
    if(isNaN(day) && day.length > 0){ 
        spanDay.innerHTML="invalid input"
        removeText(spanDay,inputDay,dayLabel)
    }else if(day.length===0){ 
        spanDay.innerHTML="this field is required"
        removeText(spanDay,inputDay,dayLabel)
    }else{
        if (day<32){
            theDay=day
            if (specialMonths30.includes(+month) && +day===31){
                theDay=0;
                spanDay.innerHTML="must be a valid day"
                removeText(spanDay,inputDay,dayLabel)
            }
        }else{
            spanDay.innerHTML="must be a valid day"
            removeText(spanDay,inputDay,dayLabel) 
        }
    }
    // month check
    if(isNaN(month) && month.length > 0){
        spanMonth.innerHTML="invalid input"
        removeText(spanMonth,inputMonth,monthLabel)
    }else if(month.length==0){
        spanMonth.innerHTML="this field is required"
        removeText(spanMonth,inputMonth,monthLabel)
    }else{
        if (months.includes(+month)){
            theMonth=month
        }else{
            spanMonth.innerHTML="must be a valid month"
            removeText(spanMonth,inputMonth,monthLabel)  
        }
    }
    // check year
    if(isNaN(year) && year.length > 0){
        spanYear.innerHTML="invalid input"
        removeText(spanYear,inputYear,yearLabel)
    }else if(year.length==0){
        spanYear.innerHTML="this field is required"
        removeText(spanYear,inputYear,yearLabel)
    }else{
        if (year>toDay.getFullYear()){
            spanYear.innerHTML="must be in the past"
            removeText(spanYear,inputYear,yearLabel)
        }else{
            theYear=year
        }
    }
}
function removeText(text,input,label){
    input.className="error"
    label.style.color="red"
    setTimeout(() => {
        text.innerHTML=""
        input.className=""
        label.style.color="hsl(0, 1%, 44%)"
    },duration)
}
function toadd(month,day,year){
    if (day!==0 && month!==0 && year!==0){
        let birthDate=new Date(`${month} ${day} ${year}`)
        let age=toDay - birthDate
        if (birthDate.getTime() > toDay.getTime()){
            let month=1000*60*60*24*30.5
            if (-age > month){
                spanMonth.innerHTML="that month didn't come yet"
                removeText(spanMonth,inputMonth,monthLabel)  
            }else{
                spanDay.innerHTML="that day didn't come yet"
                removeText(spanDay,inputDay,dayLabel)
            }
        }else{
            let years=Math.floor(age/(1000*60*60*24*365.5))
            let months=Math.floor((age%(1000*60*60*24*365.5))/(1000*60*60*24*30.5))
            let days=Math.floor((age%(1000*60*60*24*365.5))%(1000*60*60*24*30.5)/(1000*60*60*24))
            document.querySelector(".result .year span").innerHTML=(years)
            document.querySelector(".result .month span").innerHTML=(months)
            document.querySelector(".result .day span").innerHTML=(days)
        }
        
    }
}
const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("keydown",  (event) => {
      let currentIndex=index
      if (event.key === 'ArrowRight') {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
