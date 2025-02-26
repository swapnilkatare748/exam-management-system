import React from 'react';
import styles from './ViewQutionsPage.module.css';
import WebsiteWrapper from '../../../Components/WebsiteWrapper';
import ViewExamDetails from '../../../Components/AdmineComponents/ViewExamDetails/ViewExamDetails';

function ViewQutionsPage() {
  return (
    <WebsiteWrapper>
    <div className={`flex ${styles.ViewQutionsPage}`}>
          <ViewExamDetails/>
    </div>
    </WebsiteWrapper>
  )
}

export default ViewQutionsPage
