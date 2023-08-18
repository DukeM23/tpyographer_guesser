import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Something from "../fonts/";
const fontFamilies = [
  {
    fontFamily: "Roboto",
    src: "../fonts/Roboto-Regular.ttf",
  },
  {
    fontFamily: "Bodoni Moda",
    src: "../fonts/BodoniModa-VariableFont_opsz,wght.ttf",
  },
  {
    fontFamily: "Castoro Titling",
    src: "../fonts/CastoroTitling-Regular.ttf",
  },
  {
    fontFamily: "IBM Plex Sans KR",
    src: "../fonts/IBMPlexSansKR-Regular.ttf",
  },
  {
    fontFamily: "Mansalva",
    src: "../fonts/IBMPlexSansKR-Regular.ttf",
  },
  {
    fontFamily: "Odibee Sans",
    src: "../fonts/OdibeeSans-Regular.ttf",
  },
  {
    fontFamily: "Playfair Display",
    src: "../fonts/PlayfairDisplay-VariableFont_wght.ttf",
  },
  {
    fontFamily: "Rubik",
    src: "../fonts/Rubik-VariableFont_wght.ttf",
  },
  {
    fontFamily: "Tilt Prism",
    src: "../fonts/TiltPrism-Regular-VariableFont_XROT,YROT.ttf",
  },
  {
    fontFamily: "Times New Roman",
    src: ".",
  },
  {
    fontFamily: "Arial",
    src: ".",
  },
  {
    fontFamily: "Times New Roman",
    src: ".",
  },
  {
    fontFamily: "Wingdings",
    src: ".",
  },
  {
    fontFamily: "Zen Old Mincho",
    src: "../fonts/ZenOldMincho-Regular.ttf",
  },
  {
    fontFamily: "Poppins",
    src: "../fonts/Poppins-Regular.ttf",
  },
];

const getRandomFont = () => Math.floor(Math.random() * fontFamilies.length);

function App() {
  const [text, setText]: [String | null, any] = useState("Wienser man colects");
  const [font, setFont]: [any | null, any] = useState(
    fontFamilies[getRandomFont()]
  );

  const { fontFamily, src } = font;

  useEffect(() => {
    // setText("Do you mean the muffin man? The Muffin Man!");
    console.log(font);
    var tCtx = document.getElementById("textCanvas").getContext("2d"), //Hidden canvas
      imageElem = document.getElementById("image"); //Image element
    // tCtx.font = "30px Roboto";
    if (src !== ".") {
      let f = new FontFace(fontFamily, `url("${src}")`);

      f.load().then((font) => {
        document.fonts.add(font);
        console.log(font);
        tCtx.canvas.width = tCtx.measureText(text).width + 1000;

        tCtx.font = `30px ${fontFamily}`;
        // console.log(tCtx.font);
        tCtx.fillText(text, 0, 50, 3000);
        imageElem.src = tCtx.canvas.toDataURL();
      });
    } else {
      tCtx.canvas.width = tCtx.measureText(text).width + 1000;

      tCtx.font = `30px ${fontFamily}`;
      // console.log(tCtx.font);
      tCtx.fillText(text, 0, 50, 3000);
      imageElem.src = tCtx.canvas.toDataURL();
    }
  }, [text, font]);

  const handleClick = () => {
    const index = getRandomFont();

    setFont(fontFamilies[index]);
  };
  console.log(text);
  return (
    <div className="p-1">
      <canvas
        id="textCanvas"
        className="hidden"
        width={2000}
        height={100}
      ></canvas>
      <img id="image" />
      <br />
      <textarea id="text" onChange={(e) => setText(e.target.value)}></textarea>
      <p style={{ fontFamily: "Roboto" }}>Something</p>
      <button className="border-black border p-2" onClick={handleClick}>
        Generate Font
      </button>
    </div>
  );
}
const MemoizedApp = React.memo(App);
export default App;
