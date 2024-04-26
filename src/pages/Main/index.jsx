import React, { useEffect } from "react";

import Quagga from "quagga";
import { Video } from "./styles";


export default function Main() {
    
    useEffect(() => {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#video"),
            constraits: {
              facingMode: "environment",
            },
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: ["ean_reader"],
          }
        },
      err => {
        if(err) {
          console.error(err);
          alert("Erro ao abrir a câmera dos dispositivo");
          return;
        }

        Quagga.start();
      }
      );
      }
    }, []);

  return (
    <Video id="video" />

);
}
