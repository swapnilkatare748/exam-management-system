import React from 'react';
import AddExam from '../../../Components/AdmineComponents/AddExam/AddExam';
import styles from './AddEmamPage.module.css';
import WebsiteWrapper from '../../../Components/WebsiteWrapper';
function AddExamPage() {
  return (
    <WebsiteWrapper>
    <div className={`flex ${styles.AddExamPage}`}>
      <AddExam/>
    </div>
    </WebsiteWrapper>
  )
}

export default AddExamPage
