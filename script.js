const line02 = document.getElementById("game-line-02")
const line03 = document.getElementById("game-line-03")
const error02 = document.getElementById("game-error-02")
const error03 = document.getElementById("game-error-03")


function startAnim() {
  let left2 = 0;
  let left3 = -300;
  let start, previousTimeStamp;
  let done2 = false;
  let done3 = false;
  // let done = done2 && done3;
  
  function stopImg() {
    // console.log("click2")
    done2 = true;
    console.log("initial left2", left2);
    const fromSide = -(left2 % 100);
    console.log("fromSide", fromSide);
    if (fromSide < 20) {
      left2 = left2 + fromSide;
      console.log('less than 20, new left2 = ')
      console.log(left2 )
      line02.style.left = `${left2}%`;
    } else if (fromSide > 80) {
      left2 = Math.floor(left2 / 100) * 100 - 100;
      console.log('more than 80, new left2 = ')
      console.log( left2);
      line02.style.left = `${left2}%`;
    }
  }


  function stopImg2() {
    if (
      (left2 <= -280  && left2 >= -300)
      ) {
      done2 = true;
      left2 = -300;
      console.log('less than 20, new left2 = ')
      console.log(left2 )
      line02.style.left = `${left2}%`;
      line02.removeEventListener('click', stopImg2)
      line02.style.cursor = `initial`;
    } else if (
      (left2 <= 0  && left2 >= -20)
      ) {
        done2 = true;
        left2 = 0 ;
        console.log('more than 80, new left2 = ', left2)
        line02.style.left = `${left2}%`;
        line02.removeEventListener('click', stopImg2)
        line02.style.cursor = `initial`;
    } else {
      error02.classList.add('visible');
      setTimeout(() => {
        error02.classList.remove('visible');
      }, 300)
    }
  }
  function stopImg3() {
    if (
      (left3 <= -280  && left3 >= -300)
      ) {
      done3 = true;
      left3 = -300;
      console.log('less than 20, new left3 = ')
      console.log(left3 )
      line03.style.left = `${left3}%`;
      line03.removeEventListener('click', stopImg3)
      line03.style.cursor = `initial`;
    } else if (
      (left3 <= 0  && left3 >= -20)
      ) {
        done3 = true;
        left3 = 0 ;
        console.log('more than 80, new left3 = ', left3)
        line03.style.left = `${left3}%`;
        line03.removeEventListener('click', stopImg3)
        line03.style.cursor = `initial`;
    } else {
      error03.classList.add('visible');
      setTimeout(() => {
        error03.classList.remove('visible');
      }, 300)
    }
  }


  // function stopImg3() {
  //   console.log("click3")
  //   done3 = true;
  //   console.log(done3)
  // }
  line02.addEventListener('click', stopImg2)
  line03.addEventListener('click', stopImg3)


  function step(timeStamp) {
    if (start === undefined) {
      start = timeStamp;
    }

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

    if (!(done2 && done3)) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
//   // line02.style.backgroundPosition = `${left}% 0`
}


startAnim()