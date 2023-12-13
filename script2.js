const gameContainer = document.getElementById("game-container")

const line02 = document.getElementById("game-line-02")
const line03 = document.getElementById("game-line-03")
const error02 = document.getElementById("game-error-02")
const error03 = document.getElementById("game-error-03")
const timer = document.getElementById("game-timer")
const timerTime = document.getElementById("timer-time")
const timerProgress = document.getElementById('timer-progress');

const popUpOverlay = document.getElementById('overlay')
const popUpSuccess = document.getElementById('game-popup-success')
const popUpFail = document.getElementById('game-popup-fail')



function startAnim() {
  let left2 = -150;
  let left3 = -75;
  let start, previousTimeStamp;
  let done2 = false;
  let done3 = false;
  let fail2 = false;
  let fail3 = false;

  function showSuccessPopUp() {
    console.log("success")
    timer.classList.add('game__timer--hidden')
    gameContainer.classList.add('game__container--success')
  
    setTimeout(() => {
      popUpOverlay.classList.add('visible__popup')
      popUpSuccess.classList.add('visible__popup')
    }, 1200)
  }
  
  function showFailPopUp() {
    console.log("fail")
    
    setTimeout(() => {
      timer.classList.add('game__timer--hidden')
      gameContainer.classList.add('game__container--fail')
      if (fail2) {
        // error02.classList.remove('visible');
        error02.classList.add('error--fail');
      }
      if (fail3) {
        // error03.classList.remove('visible');
        error03.classList.add('error--fail');
      }
    }, 400)
    
    setTimeout(() => {
      popUpOverlay.classList.add('visible__popup')
      popUpFail.classList.add('visible__popup')
    }, 1200)
  }
  

  function endOfGameForLine(line, fn, error) {
    line.removeEventListener('click', fn)
    line.style.cursor = `initial`;
    error.classList.remove('visible')
  }
  
  function clearAfterTimeEnded(timeInt, fn2, fn3) {
    clearInterval(timeInt);
    timerProgress.classList.add('paused')
    endOfGameForLine(line02, fn2, error02) 
    endOfGameForLine(line03, fn3, error03) 
  }
  
  function startTimer(startingPoint) {
    timerTime.innerText = startingPoint;
    timerProgress.classList.add('game__timer--anim')
    const timeInt = setInterval(() => {
      startingPoint--;
      timerTime.innerText = startingPoint;
      if (startingPoint === 0) {
        clearAfterTimeEnded(timeInt);
        showFailPopUp();
      }
    }, 1000)
    return timeInt;
  }

  function handleErrorClick(errorEl) {
    errorEl.classList.add('visible');
    setTimeout(() => {
      errorEl.classList.remove('visible');
    }, 300)
  }
  
  function handleRightClickLeftSide(left, line,error, fn) {
    // done = true;
    left = -300;
      // console.log('done2', done2 )
      // console.log('done from func', done )
    line.style.left = `${left}%`;
    endOfGameForLine(line, fn, error) 
    return true;
  }
  function handleRightClickRightSide(left, line, error, fn) {
    // done = true;
    left = 0 ;
    line.style.left = `${left}%`;
    endOfGameForLine(line, fn, error) 
    return true;
  }


  function stopImg2() {
    if (left2 <= -280  && left2 >= -300) {
      done2 = handleRightClickLeftSide(left2, line02, error02, stopImg2)
    } else if (left2 <= 0  && left2 >= -20) {
      done2 = handleRightClickRightSide(left2, line02, error02, stopImg2)
    } else {
      handleErrorClick(error02)
      setTimeout(() => {        
        done2 = true;
        fail2 = true;
      }, 300)
    }
  }

  function stopImg3() {
    if (left3 <= -280  && left3 >= -300) {
      done3 =handleRightClickLeftSide( left3, line03,error03, stopImg3)
    } else if (left3 <= 0  && left3 >= -20) {
      done3 = handleRightClickRightSide( left3, line03,error03, stopImg3)
    } else {
      handleErrorClick(error03)
      setTimeout(() => {        
        done3 = true;
        fail3 = true;
      }, 300)
    }
  }


  // function stopImg(done, left, line, error) {
  //   if (left <= -280  && left >= -300) {
  //     // console.log('click')
  //     // console.log(left)
  //     handleRightClickLeftSide(done, left, line, () => stopImg(done, left, line, error))
  //   } else if (left <= 0  && left >= -20) {
  //     // console.log('click')
  //     // console.log(left)
  //     handleRightClickRightSide(done, left, line, () => stopImg(done, left, line, error))
  //   } else {
  //     handleErrorClick(error)
  //   }
  // }



  let startingPoint = 10;
  const timeInt = startTimer(startingPoint);


  line02.addEventListener('click', stopImg2)
  line03.addEventListener('click',  stopImg3)

  function step(timeStamp) {
    if (start === undefined) {
      start = timeStamp;
    }
    const elapsed = timeStamp - start;

    if (previousTimeStamp !== timeStamp) {
      if (!done2) {
        left2 -= 1;
        line02.style.left = `${left2}%`;
        if (left2 === -300) {
          left2 = 0;
        };
      }

      if (!done3) {
        left3 += 1.5;
        line03.style.left = `${left3}%`;
        if (left3 === 0) {
          left3 = -300;
        };
      }
    }

    
    if (elapsed < startingPoint * 1000) {
      previousTimeStamp = timeStamp;
      if (!(done2 && done3)) {
        window.requestAnimationFrame(step);
      } else {
        clearAfterTimeEnded(timeInt);
        if (fail2 || fail3) {
          showFailPopUp()
        } else {
          showSuccessPopUp()
        }
      }
    }
  }
  window.requestAnimationFrame(step);
//   // line02.style.backgroundPosition = `${left}% 0`
}


startAnim()


const btns = document.querySelectorAll('.game__btn')

btns.forEach(btn => btn.addEventListener('click', () => location.reload()))