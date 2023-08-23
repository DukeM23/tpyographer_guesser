import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
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
  // const [text, setText]: [string, Dispatch<SetStateAction<string>>] = useState(
  //   "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci vel"
  // );
  const text =
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci vel";
  const [font, setFont]: [any | null, any] = useState(
    fontFamilies[getRandomFont()]
  );
  const [random, setRandom]: [any | null, any] = useState([]);
  const [score, setScore]: [number, Dispatch<SetStateAction<number>>] =
    useState(0);

  const { fontFamily, src } = font;

  useEffect(() => {
    // setText("Do you mean the muffin man? The Muffin Man!");
    var canvasPane = document.getElementById("textCanvas") as HTMLCanvasElement;
    var tCtx: CanvasRenderingContext2D = canvasPane.getContext("2d")!; //Hidden canvas
    var imageElem = document.getElementById("image")! as HTMLImageElement; //Image element
    // tCtx.font = "30px Roboto";
    if (src !== ".") {
      let f = new FontFace(fontFamily, `url("${src}")`);

      f.load().then((font) => {
        document.fonts.add(font);
        tCtx.canvas.width = tCtx.measureText(text).width;

        tCtx.font = `60px ${fontFamily}`;
        // console.log(tCtx.font);
        tCtx.fillText(text, 0, 50, tCtx.measureText(text).width);
        imageElem!.src = tCtx.canvas.toDataURL();
      });
    } else {
      tCtx.canvas.width = tCtx.measureText(text).width;

      tCtx.font = `60px ${fontFamily}`;
      // console.log(tCtx.font);
      tCtx.fillText(text, 0, 65, tCtx.measureText(text).width);
      imageElem.src = tCtx.canvas.toDataURL();
    }
    console.log(random);
    let fonts: any = [];
    for (let i = 0; i < 3; ++i) {
      let fontIdx = getRandomFont();
      fonts = [...fonts, fontFamilies[fontIdx]];
    }
    setRandom([...fonts, font]);
  }, [text, font]);

  const handleClick = () => {
    const index = getRandomFont();

    setFont(fontFamilies[index]);
  };

  const checkGuess = (e: any) => {
    e.preventDefault();
    const guess = e.target.value;
    console.log(font.fontFamily);
    if (guess === font.fontFamily) {
      setScore((prevVal) => prevVal + 1);
    } else {
      setScore((prevVal) => prevVal - 1);
    }
    setFont(fontFamilies[getRandomFont()]);
  };
  return (
    <div className="h-screen mt-20">
      <canvas
        id="textCanvas"
        className="hidden"
        width={1000}
        height={110}
      ></canvas>
      <div className="w-auto mx-20">
        <img id="image" />
      </div>
      <br />
      <div className="flex justify-center">
        <div>
          <div className="grid grid-cols-2 gap-5  mx-auto">
            {/* <textarea
              className="col-span-2 border border-black"
              onChange={(e) => setText(e.target.value)}
            ></textarea> */}
            {random.map((font: any, idx: number) => (
              <button
                key={idx}
                value={font.fontFamily}
                className="border-black border p-2"
                onClick={checkGuess}
              >
                {font.fontFamily}
              </button>
            ))}
          </div>
          <p>Score: {score}</p>
          <button className="" onClick={handleClick}>
            Generate Font
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
