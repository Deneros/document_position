import { useEffect, useRef } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import PropTypes from "prop-types";
import jsPDF from "jspdf";

PdfViewer.propTypes = {
    path: PropTypes.string,
    setPdfPosition: PropTypes.func,
    insertImage: PropTypes.shape({
        signImg: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
    }),
};

export default function PdfViewer({ path, setPdfPosition, insertImage }) {
    const canvasRef = useRef();
    const containerRef = useRef();
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('../../../node_modules/pdfjs-dist/build/pdf.worker.min.js', import.meta.url);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(path);

        loadingTask.promise.then((pdf) => {
            console.log('PDF loaded');

            const pageNum = 1;
            pdf.getPage(pageNum).then((page) => {
                console.log('Page loaded');

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
                    console.log('Page rendered');

                    setPdfPosition({
                        x: containerRef.current.offsetLeft,
                        y: containerRef.current.offsetTop
                    });

                    if (insertImage) {
                        const img = new Image();
                        img.onload = function () {
                            context.drawImage(img, insertImage.x, insertImage.y);
                            // Una vez que la imagen se ha cargado y dibujado en el canvas, crea el PDF
                            // createPdfFromCanvas(canvas);
                        };
                        img.src = insertImage.signImg;
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

        // Convertir las coordenadas del navegador a las del PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Escalar la imagen para que se ajuste al PDF
        const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width * ratio, canvas.height * ratio);

        pdf.save("output.pdf");
    };

    return (
        <div ref={containerRef}>
            <canvas ref={canvasRef} />
        </div>
    );
}