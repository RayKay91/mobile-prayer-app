 const showDate = () => {
    const d = new Date();
  
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return d.toLocaleDateString('en-GB', options);
  };
  

  export default showDate