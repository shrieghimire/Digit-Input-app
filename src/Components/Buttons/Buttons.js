import React from 'react'
import "buttons.css"

function Buttons() {
  return (
    <div className="buttons">
        <button onClick={setToErase}>Reset</button>
        <button>
          <a
            id="download_image_link"
            href="download_link"
            onClick={saveImageToLocal}
          >
            Download Image
          </a>
        </button>
      </div>
  )
}

export default Buttons