import jsPDF from "jspdf";
import { useEffect, useRef } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import PropTypes from "prop-types";

PdfViewer.propTypes = {
    path: PropTypes.string,
    setPdfPosition: PropTypes.func,
    insertImage: PropTypes.shape({
        signImg: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
    }),
};

export default function PdfViewer({ path, insertImage }) {
    const canvasRef = useRef();
    const containerRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('../../../node_modules/pdfjs-dist/build/pdf.worker.min.js', import.meta.url);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(path);

        loadingTask.promise.then((pdf) => {
            // console.log('PDF loaded');

            const pageNum = 1;
            pdf.getPage(pageNum).then((page) => {
                // console.log('Page loaded');

                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => {
                    if (insertImage) {
                        for (const image of insertImage) {
                            const img = new Image();
                            const desiredWidth = 200;
                            const desiredHeight = 100;

                            img.onload = function () {
                                context.drawImage(img, image.x, image.y, desiredWidth, desiredHeight);
                                const base64Pdf = createPdfFromCanvas(canvas);

                                // Aquí, solo intenta hacer el POST si signImg existe y no es una cadena vacía
                                if (image.signImg) {
                                    fetch('https://your-api-url.com/endpoint', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ pdf: base64Pdf }),
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log('Success:', data);
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                        });
                                }
                            };
                            // Aquí, si signImg existe y no es una cadena vacía, entonces establece img.src
                            // Si no, maneja el caso de signImg vacía como desees.
                            if (image.signImg) {
                                img.src = image.signImg;
                            } else {
                                // Maneja el caso de signImg vacía aquí
                                // Por ejemplo, puedes mostrar el nombre del firmante como texto.
                                context.font = "20px Arial";
                                context.fillText(image.name, image.x, image.y);
                                createPdfFromCanvas(canvas);
                            }
                        }
                    }
                });
            });
        }, (reason) => {
            console.error(reason);
        });

    }, [path, insertImage]);

    const createPdfFromCanvas = (canvas) => {
        const pdf = new jsPDF('p', 'mm', [canvas.width, canvas.height]);
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width * ratio, canvas.height * ratio);

        const base64Image = pdf.output('datauristring');
        // pdf.save("/src/assets/testing.pdf");

        return base64Image;
    };



    return (
        <div ref={containerRef} id='pdfContainer'>
            <canvas ref={canvasRef} />
        </div>
    );
}




