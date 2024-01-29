'use client';
import { useState, useEffect,  useRef} from 'react'
import './App.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import First from './components/First/First'
import Template from './components/Template/Template'
import Last from './components/Last/Last'
import { useSelector } from 'react-redux';
import NewTemplate from './components/NewTemplate/NewTemplate';
// import { Margin, usePDF } from "react-to-pdf";
import { useParams } from "next/navigation";

function App(props) {

  const [data, setData] = useState({})   
  const {name } = useParams()
  const mainStore=useSelector(state=>state.mainStore.data)
  const category_object={};

  const targetRef = useRef(null);
  const downloadBtnRef=useRef(null);
  const loaderRef=useRef(null);

  const templatePageNo=useRef(1)
  const newTemplatePageNo=useRef(1)

  templatePageNo.current=2;
  // newTemplatePageNo.current=templatePageNo.current;

  let score={};
  let first={}
  if("creation" in data){
    first={"date":data.creation,"name":data.user_name}
  }

  if("health_check_summary_table" in data){
    data.health_check_summary_table.map((summary_data)=>{
      if(!(summary_data.category in category_object)){
        category_object[summary_data.category]=1;
      }
    })

    data.health_check_score_table.map((score_data)=>{
      if("score" in score_data){
        score[score_data.category]=score_data.score;
      }
    })
  }

  useEffect(()=>{
    async function fetchData(){
      const baseURL=`https://xray-backend.onrender.com/api/${name}`;
      let response=await fetch(baseURL, {method:"GET"})
      response=await response.json();

      setData(response.data);
      console.log(response.data)
    }

    fetchData();
    },[])


    const generatePdf = async () => {
      if (targetRef.current) {
        const pdf = new jsPDF("portrait", "pt", "a4"); 
        let i=0;
        for(let child of targetRef.current.children){
          const data = await html2canvas(child);
          const img = data.toDataURL({
            format: "jpeg",
          });  
          const imgProperties = pdf.getImageProperties(img);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
          if(i!=0){
            pdf.addPage()
          }
          pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight,"","FAST");
          const links = Array.from(child.querySelectorAll("a"));

          const A4Width = pdfWidth; // A4 width in pixels
          const A4Height = pdfHeight; // A4 height in pixels
        
          const widthScaleFactor = A4Width / child.getBoundingClientRect().width;
          const heightScaleFactor = A4Height / child.getBoundingClientRect().height;
        
          const scale_factor = Math.min(widthScaleFactor, heightScaleFactor);
          links.forEach(link => {
            const rect = link.getBoundingClientRect();
            console.log("rect",rect)
            const x = (rect.left-child.getBoundingClientRect().left)*scale_factor;
            const y = (rect.top-child.getBoundingClientRect().top)*scale_factor;
            const width = rect.width*scale_factor;
            const height = rect.height*scale_factor;
            console.log("child top,child left, x, y",child.getBoundingClientRect().top,child.getBoundingClientRect().left,rect.top,rect.left)
            // pdf.rect(x,y, width,height, "F");
            pdf.link(x,y, width,height, {url: link.href});      
          });
          i++;
        }
        pdf.save(`${first.name} Financial X-Ray Report.pdf`);
        loaderRef.current.style.display="none"
      }
    };

    function toPDF(){
      downloadBtnRef.current.classList.add("downloadBtnClicked");
      loaderRef.current.style.display="block"
      generatePdf();
      setTimeout(()=>{
        downloadBtnRef.current.classList.remove("downloadBtnClicked");
      },500)
    }
    console.log("App")
  return (
    <div className="App">
      <button className="DownloadBtn" ref={downloadBtnRef} onClick={toPDF}>Download</button>
      <div ref={targetRef}>
        <First score={score} data={first}></First>
        {Object.keys(category_object).map((category,index)=>{
          // templatePageNo.current=index+newTemplatePageNo.current;
          return( 
            <>
              <Template uniqueid={"main"+category} key={category} data={data} pageNo={templatePageNo.current++}>{category}</Template> 
              {(category in mainStore)?mainStore[category].map((key,index)=>{ return <NewTemplate key={"newTemplate"+category+index} data={key} pageNo={templatePageNo.current++}>{category}</NewTemplate>}):null}
            </>
          )
        })}
        <Last pageNo={templatePageNo.current++}>What&rsquo;s Next</Last>
      </div>
      <div ref={loaderRef} className="loader-container">
        <div className="loader"></div>
      </div>
    </div>

  )
}

export default App
