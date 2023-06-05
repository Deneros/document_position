// import { PDFDocument } from 'pdf-lib';
import { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import PdfViewer from "../../components/Canvas/Canvas";
import SignatureComponent from "../../components/Draggable/SignaturePositioning";
// import {useFetch} from '../../hooks/useFetch';

import pdf from '../../assets/document/testing.pdf';
import img from '../../assets/img/grafofirma.png';



export default function Positioning() {
    const data = [{ name: 'Nico chulo' }, { name: 'Papi Pepa' }];
    const [draggedItems, setDraggedItems] = useState([]);
    const [insertImage, setInsertImage] = useState(null);
    // const [pdf, setPdf] = useState(null);

    const handleSendData = async () => {
        const url = 'https://tuapi.com/enviar_datos'; 
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(draggedItems)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Do something with the response if necessary
            console.log(data);
        } catch (error) {
            console.error('Error sending data', error);
        }
    };

    const handleStop = (event, data, name) => {
        // Obtén la posición del elemento que contiene tu PDF
        const pdfContainer = document.getElementById('pdfContainer');
        const rect = pdfContainer.getBoundingClientRect();

        // Calcula la posición del arrastrable en relación con el elemento que contiene el PDF
        const x = data.x - rect.left;
        const y = data.y - rect.top;

        setDraggedItems(prevState => [...prevState, { name, position: { x, y } }]);

        // console.log(`Elemento soltado en x: ${x}, y: ${y}`);
    };

    useEffect(() => {
        console.log(draggedItems);
    }, [draggedItems])


    return (
        <>
            <div>
                <Sidebar
                    draggableComponents={
                        data.map((destinatary) => ({
                            component: SignatureComponent,
                            props: { name: destinatary.name },
                            handleStop: (event, data) => handleStop(event, data, destinatary.name)
                        }))
                    }
                />
            </div>
            <PdfViewer path={pdf} insertImage={insertImage}></PdfViewer>
            <button onClick={handleSendData}>Enviar datos</button>

        </>
    )
}

