import {useEffect, useState} from 'react';
const useLocation = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    try {
      async function fetchdata() {
        const requestOptions: RequestInit = {
          method: 'GET',
          redirect: 'follow',
        };
        const response = await fetch(
          'https://api.ipify.org?format=json',
          requestOptions,
        );
        let {ip} = await response.json();
        const address = await fetch(`https://ipapi.co/${ip}/json`);
        const data = await address.json();
        setLocation(data);
      }
      fetchdata();
    } catch (e) {
      console.error('Error fetching location', e);
      return null;
    }
  }, []);
  return location;
};

export {useLocation};
