import React from 'react'
import styles from './Homepage.module.css';
import WebsiteWrapper from '../../Components/WebsiteWrapper';
import Footer from '../../Components/Footer/Footer';
import { useParams } from "react-router-dom";
import {studentMarks} from '../../Data.jsx';
import StudentProgressChart from '../../Components/AdmineComponents/StudentProgressChart/StudentProgressChart.jsx';
import OllAdmineCom from "../../Components/AdmineComponents/AdminesCom/OllAdmineCom.jsx"
import ExamPreview from '../../Components/AdmineComponents/examPreview/ExamPreview.jsx';

function Homepage() {

  return (
    <WebsiteWrapper>
    <div className={`flex ${styles.Homepage}`}>
     <StudentProgressChart marksData={studentMarks} />
     <div className={styles.ManageAdmin}>
       <OllAdmineCom/>
        <ExamPreview/>
     </div>
    </div>
    {/* <Footer/> */}
    </WebsiteWrapper>
  )
}

export default Homepage
