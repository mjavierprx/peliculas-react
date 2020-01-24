import React, { useState, useEffect } from 'react';

function StarsRate(props) {
  let stars = [];
  const [getStars, setStars] = useState([]);
  const starYellow = '/img/starY.png';
  const starGrey = '/img/starG.png';
  const starMedium = [{ min: 1, max: 2, star: 'star1-2' }, { min: 3, max: 4, star: 'star3-4' }, { min: 5, max: 5, star: 'star5' },
    { min: 6, max: 7, star: 'star6-7' }, { min: 8, max: 9, star: 'star8-9' }
  ];
  const rate = props.rate;

  useEffect(() => {
    if (rate !== undefined) {
      let numStarsGrey;
      let numStarsYellow = Math.trunc(rate);
      for (let i = 0; i < numStarsYellow; i++) {
        stars.push(starYellow);
      }
      if (rate % 1 === 0) {
        numStarsGrey = 10 - numStarsYellow;
      } else {
        const decimal = Number(rate.toString().slice(2));
        stars.push('/img/' + starMedium.find(elem => elem.min <= decimal && elem.max >= decimal).star + '.png');
        numStarsGrey = 10 - numStarsYellow - 1;
      }
      for (let i = 0; i < numStarsGrey; i++) {
        stars.push(starGrey);
      }
      setStars(stars);
    }
  }, []);

  return (
    <span>
      {getStars.map((src, i) => {
        return <img src={src} key={i} alt="" />
      })}
    </span>
  )
}

export default StarsRate;