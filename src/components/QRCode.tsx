import { useEffect, useState } from "react";

const QRCode = ({ data, logo, qrCode, setQrCode }: any) => {
  const [QRCodeStyling, setQRCodeStyling] = useState<any>(null);

  console.log(data);

  useEffect(() => {
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      setQRCodeStyling(() => QRCodeStyling);
    });
  }, []);

  useEffect(() => {
    if (QRCodeStyling && data) {
      const qrCode = new QRCodeStyling({
        width: 110,
        height: 110,
        data: data,
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
        //dotsOptions: { type: "dots", color: "#1D366D" },
        backgroundOptions: { color: "#ffffff" },
        image: logo,
        dotsOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#1D366D",
            color2: "#1D366D",
            rotation: "0",
          },
        },
        cornersSquareOptions: { type: "square", color: "#000000" },
        cornersSquareOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0",
          },
        },
        cornersDotOptions: { type: "", color: "#000000" },
        cornersDotOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0",
          },
        },
        backgroundOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#ffffff",
            color2: "#ffffff",
            rotation: "0",
          },
        },
      });
      setQrCode(qrCode);
    }
  }, [QRCodeStyling, data]);

  useEffect(() => {
    if (qrCode) {
      qrCode.append(document.getElementById("qr-code-container"));
    }
  }, [qrCode]);

  return <div id='qr-code-container' key={data} />;
};

export default QRCode;
