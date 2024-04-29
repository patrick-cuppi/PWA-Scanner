import React, { useEffect } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import Quagga from "quagga";
import { Video } from "./styles";
import { validateIsbn } from "../../services/books"


export default function Main() {
  let scannerAttemps = 0;

  const onDetected = result => {
      Quagga.offDetected(onDetected);

      const isbn = result.codeResult.code;

      if(validateIsbn(isbn)) {
        alert(`ISBN válido ${isbn}`);
        return;
      } else {
        if(scannerAttemps >= 5) {
          alert('Não é possível ler o código do livro!')
        }
      }

      scannerAttemps++;
      Quagga.onDetected(onDetected);
      
    }  

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
      },

      Quagga.onDetected(onDetected)

      );
      }
    }, []);

  return (
    <Video id="video" />

);
}
