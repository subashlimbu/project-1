function setupGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cell = document.querySelector('div')
  const cells = []
  let player = 390
  let laser = 390
  let alienIndex = 0
  let bombIndex = 0
  let laserIndex = 0
  let timerLaserId = 0
  let computerIndex = null
  let alienArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
  let laserRepeat = null
  let bombId = null


  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === player) {
      cell.classList.add('player')
    }
    if (alienArray.includes(i)) {
      cell.classList.add('alien')
    }

    grid.appendChild(cell)
    cells.push(cell)
  }

  let alienDirection = 'right'
  let intervalId

  function alienMoving() {

    intervalId = setInterval(() => {
      if (alienDirection === 'right') {
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          cells[invader].classList.remove('alien')
        }
        let rightColumn = false
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          if ((invader + 1) % 20 === 0) {
            rightColumn = true
            // console.log(rightColumn)
          }
        }
        for (let i = 0; i < alienArray.length; i++) {
          let invader = alienArray[i]
          if (rightColumn) {
            invader = invader + 20
            alienDirection = 'left'
          } else {
            invader = invader + 1
          }
          alienArray[i] = invader
          cells[invader].classList.add('alien')
        }
      } else if (alienDirection === 'left') {
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          cells[invader].classList.remove('alien')
        }
        let leftColumn = false
        for (let i = 0; i < alienArray.length; i++) {
          const invader = alienArray[i]
          if ((invader) % 20 === 0) {
            leftColumn = true
          }
        }
        for (let i = 0; i < alienArray.length; i++) {
          let invader = alienArray[i]
          if (leftColumn) {
            invader = invader + 20
          } else {
            invader = invader - 1
          }
          alienArray[i] = invader
          cells[invader].classList.add('alien')
        }
        if (leftColumn) {
          alienDirection = 'right'
        }
      }
      alienArray.forEach((invader) => {
        if (invader >= 380) {
          clearInterval(intervalId)
        }
      })
    }, 100)
  }
  alienMoving()

  function stopLaser() {
    cells[laserIndex].classList.remove('laser')
    clearInterval(timerLaserId)
    laserIndex = null
  }

  function startBomb() {
   
    // console.log(randomComputerIndex)
    // console.log(randomComputerIndex)
    const alienFront = alienArray.slice(-10)
    const randomComputerIndex = Math.floor(Math.random() * alienFront.length)

// alienFront[randomComputerIndex] + width


    // console.log(a)
    bombIndex = parseInt(a)
    // console.log(bombIndex)
    const timerBombId = setInterval(() => {
      if (bombIndex < (width * width)) {
        cells[bombIndex].classList.add('bomb')
        setTimeout(() => {
          bombId = setInterval(() => {
            cells[bombIndex].classList.remove('bomb')
            bombIndex += width
            // console.log(bombIndex)
            cells[bombIndex].classList.add('bomb')
            if (bombIndex <= 21) {
              clearInterval(laserRepeat)
            }
            startBomb()
          }, 200)
        }, 200)

      }
    }, 200)
  }
  


  // function dropBomb() {
  //   if (bombIndex > (width * width)) {
  //     clearInterval(timerBombId)
  //     bombIndex = 0
  //     startBomb()
  //   } else {
  //     clearInterval(timerBombId)
  //     cells[bombIndex].classList.add('bomb')
  //     setTimeout(removeBomb, 50)
  //     // loseLife()
  //   }
  // }
  // dropBomb()

  // function removeBomb() {
  //   if (bombIndex <= (width * width)) {
  //     console.log(bombIndex)
  //     cells[bombIndex].classList.add('bomb')
  //   }
  //   const bombId = setInterval(() => {
  //     cells[bombIndex].classList.remove('bomb')
  //     bombIndex += width
  //     console.log(bombIndex)
  //     cells[bombIndex].classList.add('bomb')


  //   }, 500)

  // }

  // removeBomb()

  document.addEventListener('keydown', (event) => {

    if (event.keyCode === 32) {
      let laserIndex = player - width
      const laserInterval = setInterval(() => {
        if (laserIndex < 21) {
          cells[laserIndex].classList.remove('laser')
          clearInterval(laserInterval)
        }
        if (cells[laserIndex].classList.contains('alien') === true) {
          cells[laserIndex].classList.remove('laser')
          cells[laserIndex].classList.remove('alien')
          alienArray.splice(alienArray.indexOf(laserIndex), 1)
          clearInterval(laserInterval)
        } else {
          cells[laserIndex].classList.remove('laser')
          laserIndex -= width
          cells[laserIndex].classList.add('laser')
        }
      }, 200)
    }

    if (event.key === 'ArrowRight') {
      if (player === cells.length - 1) {
        return
      }
      cells[player].classList.remove('player')
      player += 1
      cells[player].classList.add('player')
    } else if (event.key === 'ArrowLeft') {
      if (player === 0 || player === 380) {
        return
      }
      cells[player].classList.remove('player')
      player -= 1
      cells[player].classList.add('player')
    }
  })
}

window.addEventListener('DOMContentLoaded', setupGame)