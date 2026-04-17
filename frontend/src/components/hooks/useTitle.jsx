import { useEffect } from 'react'

function useTitle(title) {
  useEffect(()=> {
    const siteName = 'Denture-Dental Clinic';
    const siteShortName = 'Denture'
    const fullTitle = title ? `${title} - ${siteShortName}` : siteName;
    document.title = fullTitle;
  },[title])
}

export default useTitle