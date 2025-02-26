import React from 'react'
import styles from './ViewExamPage.module.css';
import ViewExam from '../../../Components/AdmineComponents/ViewExam/ViewExam';
import WebsiteWrapper from '../../../Components/WebsiteWrapper';

function ViewExamPage() {
  return (
    <WebsiteWrapper>
    <div className={`flex ${styles.ViewExamPage}`}>
       <ViewExam/>
    </div>
    </WebsiteWrapper>
  )
}

export default ViewExamPage
