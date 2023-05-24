import { useState } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import PdfViewer from "../../components/Canvas/Canvas";
import SignatureComponent from "../../components/Draggable/SignaturePositioning";
import pdf from '../../assets/document/testing.pdf';
import img from '../../assets/img/grafofirma.png';


export default function Positioning() {
    const [pdfPosition, setPdfPosition] = useState({ x: 0, y: 0 });
    const [insertImage, setInsertImage] = useState(null);


    const handleStop = (event, data) => {
        setInsertImage({
            src: img,
            x:data.x - pdfPosition.x,
            y:data.y - pdfPosition.y
        })
        console.log(`Elemento soltado en x: ${data.x - pdfPosition.x}, y: ${data.y - pdfPosition.y}`);
    };
    return (
        <>
            <div>
                <Sidebar draggableComponents={[SignatureComponent]} handleStop={handleStop} />
            </div>
            <PdfViewer path={pdf} setPdfPosition={setPdfPosition} insertImage={insertImage}></PdfViewer>
        </>
    )
}