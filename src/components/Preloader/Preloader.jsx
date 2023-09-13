import React from 'react'
import './Preloader.scss'

const Preloader = () => {
    return (

        <div class="v-align">
        <div class="loader">
          <aside class="loader__box loader--left">
            <span class="loader__circle"></span>
          </aside>
          <aside class="loader__box loader--right">
            <span class="loader__circle"></span>
          </aside>
        </div>
      </div>
    )
};

export default Preloader
