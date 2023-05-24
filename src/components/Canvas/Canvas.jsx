import { useEffect, useRef } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import PropTypes from "prop-types";

PdfViewer.propTypes = {
    path: PropTypes.string,
    setPdfPosition: PropTypes.func,
    imageData: PropTypes.shape({
        src: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
    }),
};

export default function PdfViewer({ path, setPdfPosition, imageData }) {
    const canvasRef = useRef();
    const containerRef = useRef();  // Crear una referencia para el contenedor
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

                    // Imprimir la posición del PDF después de renderizar
                    setPdfPosition({
                        x: containerRef.current.offsetLeft,
                        y: containerRef.current.offsetTop
                    });

                    if (imageData) {
                        const img = new Image();
                        img.onload = function () {
                            context.drawImage(imageData.src, imageData.x, imageData.y);
                        };
                        img.src = imageData.src;
                    }

                });
            });
        }, (reason) => {
            console.error(reason);
        });

    }, [path]);

    return (
        <div ref={containerRef}> 
            <canvas ref={canvasRef} />
        </div>
    );
}