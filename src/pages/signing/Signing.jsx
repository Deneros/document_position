import { useState } from 'react';
import styled from 'styled-components';
import PdfViewer from "../../components/Canvas/Canvas";
import DocumentSigning from "../../components/DocumentSigning/DocumentSigning";
import { useParams } from 'react-router-dom';
import pdf from '../../assets/document/testing.pdf';
// import img from '../../assets/img/grafofirma.png';


const PdfContainer = styled.div`
  position: relative;
  display: inline-block; // O cambiar a 'block' si quieres que el contenedor ocupe todo el ancho posible
`;

const signers = [
    {
        id:2412314,
        name: "Nicolas Velez",
        x: 200,
        y: 300,
        signImg:""
    },
    {
        id:3439283,
        name: "Sachat Quintero",
        x: 500,
        y: 700,
        signImg:""
    }
];

export default function Signing() {
    const [insertImage, setInsertImage] = useState([]);
    const { id } = useParams();

    const insertSignature = (image, x, y) => {
        setInsertImage(prevImages => {
            if (!Array.isArray(prevImages)) {
                console.error('prevImages is not an array:', prevImages);
                return [{ signImg: image, x, y }];
            }
            return [...prevImages, { signImg: image, x, y }];
        });
    };

    return (
        <PdfContainer>
            <PdfViewer path={pdf} insertImage={insertImage} />
            <DocumentSigning signers={signers} insertSignature={insertSignature} signerId={Number(id)}/>
        </PdfContainer>
    );
}