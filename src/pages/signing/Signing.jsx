import styled from 'styled-components';
import PdfViewer from "../../components/Canvas/Canvas";
import DocumentSigning from "../../components/DocumentSigning/DocumentSigning";
import pdf from '../../assets/document/testing.pdf';

const PdfContainer = styled.div`
  position: relative;
  display: inline-block; // O cambiar a 'block' si quieres que el contenedor ocupe todo el ancho posible
`;

const signers = [
    {
        name: "Firmante 1",
        x: 200,
        y: 300
    },
    {
        name: "Firmante 2",
        x: 500,
        y: 700
    }
];

export default function Signing() {
    return (
        <PdfContainer>
            <PdfViewer path={pdf} />
            <DocumentSigning signers={signers} />
        </PdfContainer>
    );
}