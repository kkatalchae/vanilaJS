const clock = document.querySelector(".clock"),
h2 = clock.querySelector("h2")

function getTime(){
    const now = new Date()
    const hours = now.getHours(),
          minutes = now.getMinutes(),
          seconds = now.getSeconds();

    h2.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}
init();