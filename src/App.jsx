import './App.css'
// import PdfViewer from './components/Canvas/Canvas'
// import SignatureComponent from './components/Draggable/SignaturePositioning'
// import Sidebar from './components/Sidebar/Sidebar'
// import pdf from '../src/assets/document/testing.pdf'
import Positioning from './pages/positioning/Positioning'

function App() {

  return (
    <>
      <Positioning></Positioning>
      {/* <div>
        <Sidebar draggableComponents={[SignatureComponent]} />
      </div>
      <PdfViewer path={pdf}></PdfViewer> */}
    </>
  )
}

export default App
