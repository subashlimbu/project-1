function setupGame() {
  const width = 20
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let player = 390
  let laser = 390
  let alien = 0
  let alienIndex = [1, 2, 3, 4, 5]

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === player) {
      cell.classList.add('player')
    }
    const alien = parseInt(alienIndex[i])
    console.log(alien)
    if (i === alien) {
      cell.classList.add('alien')
    }

    grid.appendChild(cell)
    cells.push(cell)
  }

  for (let i = 0; i < alienIndex.length; i++) {
    const alien = parseInt(alienIndex[i])
    if (i === alien) {
      const cell = document.createElement('div')
      cell.classList.add('alien')
      cells.push(cell)
      console.log(alien)
    }
  }

  let intervalId
  let intervalId2
  let alienDirection = 'right'

  intervalId = setInterval(() => {
    if (alienDirection === 'right') {
      cells[alien].classList.remove('alien')
      alien += 1
      cells[alien].classList.add('alien')
      if (alien % width === 0) {
        cells[alien].classList.remove('alien')
        alien += width - 1
        cells[alien].classList.add('alien')
        alienDirection = 'left'
      }
    } else if (alienDirection === 'left') {
      cells[alien].classList.remove('alien')
      alien -= 1
      cells[alien].classList.add('alien')
      console.log(alienDirection)
      if (alien % width - 1 === 0) {
        cells[alien].classList.remove('alien')
        alien += width - 1
        cells[alien].classList.add('alien')
        alienDirection = 'right'
      }
    }



  }, 100)

  document.addEventListener('keydown', (event) => {
    console.log(event.key)

    // for (let i = 0; i < gridCellCount; i++) {
    //   if (i === laser) {
    //     if (event.key === 'Spacebar') {
    //       if (player === cells.length - 1) {
    //         return
    //       }
    //     }
    //   }
    // }

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
    } else if (event.key === 'ArrowUp') {
      if (player < width) {
        return
      }
      cells[player].classList.remove('player')
      player -= width
      cells[player].classList.add('player ')
    } else if (event.key === 'ArrowDown') {
      if (player > cells.length - width - 1) {
        return
      }
      cells[player].classList.remove('player')
      player += width
      cells[player].classList.add('player')
    }
  })
}

window.addEventListener('DOMContentLoaded', setupGame)