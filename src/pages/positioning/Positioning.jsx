import { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import Sidebar from "../../components/Sidebar/Sidebar";
import PdfViewer from "../../components/Canvas/Canvas";
import SignatureComponent from "../../components/Draggable/SignaturePositioning";
import pdf from '../../assets/document/testing.pdf';
import img from '../../assets/img/grafofirma.png';


async function createPdf(insertImage) {
    // Fetch existing PDF
    const existingPdfBytes = await fetch(pdf).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true })

    // Fetch image
    const imgBytes = await fetch(insertImage.src).then(res => res.arrayBuffer())

    // Embed the PNG image bytes
    const pngImage = await pdfDoc.embedPng(imgBytes)

    // Get the first page (zero indexed)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Draw the image on the first page of the PDF
    firstPage.drawImage(pngImage, {
        x: insertImage.x,
        y: insertImage.y,
        width: pngImage.width,
        height: pngImage.height
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Create a Blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL from the Blob
    const url = URL.createObjectURL(blob);

    // Display the PDF in an iframe
    const iframe = document.createElement('iframe');
    iframe.src = url;
    document.body.appendChild(iframe);
}

export default function Positioning() {
    const [pdfPosition, setPdfPosition] = useState({ x: 0, y: 0 });
    const [insertImage, setInsertImage] = useState(null);

    const handleStop = (event, data) => {
        setInsertImage({
            signImg: img,
            x: pdfPosition.x - data.x,
            y: pdfPosition.y - data.y
        })
        console.log(`Elemento soltado en x: ${pdfPosition.x - data.x}, y: ${pdfPosition.y - data.y}`);
        // createPdf(insertImage);
    };

    useEffect(() => {
        if (insertImage) {
            // createPdf(insertImage);
        }
    }, [insertImage]);

    return (
        <>
            <div>
                <Sidebar draggableComponents={[SignatureComponent]} handleStop={handleStop} />
            </div>
            <PdfViewer path={pdf} setPdfPosition={setPdfPosition} insertImage={insertImage}></PdfViewer>
        </>
    )
}