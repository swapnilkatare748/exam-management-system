import React from 'react'
import styles from './AddQuationsPage.module.css';
import AddQuations from '../../../Components/AdmineComponents/AddQuations/AddQuations';
import WebsiteWrapper from '../../../Components/WebsiteWrapper';

function AddQuationsPage() {
  return (
    <WebsiteWrapper>
    <div className={`flex ${styles.AddQuationsPage}`}>
          <AddQuations/>
    </div>
    </WebsiteWrapper>
  )
}

export default AddQuationsPage
