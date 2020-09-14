import { useEffect } from 'react';
// Custom hook
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
    console.log("Mounted custom hook");
    return () => {
      console.log('Clean up custom hook');
    }
  }, [title]);
}