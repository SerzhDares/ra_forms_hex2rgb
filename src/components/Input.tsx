import { useState } from 'react';
import '../App.css';

interface Props {
  hexValue: string,
}

export default function Input() {

  const [form, setForm] = useState<Props>({
    hexValue: '',
  })

  let {hexValue} = form;

  const toRGB = (hex: string) => {
    const r = hex.substring(1,3);
    const g = hex.substring(3,5);
    const b = hex.substring(5,7);
    return(`rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`);
  }

  const regTest = (hex: string) => {
    return /^#([A-Fa-f0-9]{6})$/.test(hex);
  }

  const [result, setResult] = useState({
    text: '',
  })

  let {text} = result;

  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm(prevForm => ({...prevForm, [name]: value}));
    hexValue = event.target.value;
    if(hexValue.length === 7) {
      if (regTest(hexValue)) {
        setResult ({
          text: toRGB(hexValue),
        })
        document.body.style.background = toRGB(hexValue);
      } else {
        setResult ({
          text: 'Ошибка!',
        })
        document.body.style.background = 'red';
      }
    }
  }

  return (
    <div className="container">
      <input className="hexInput" name="hexValue" value={hexValue} onChange={formChangeHandler} maxLength={7}/>
      <div className="rgbResult">{text}</div>
    </div>
  )
}
