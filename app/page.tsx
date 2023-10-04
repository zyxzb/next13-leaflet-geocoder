import dynamic from 'next/dynamic';

const GeocoderControl = dynamic(() => import('./components/GeocoderControl'), {
  ssr: false,
});

const Home = () => {
  return (
    <main className='h-screen flex flex-col justify-center items-center gap-10'>
      <h1 className='text-2xl md:text-3xl'>Leaflet + Geocoder, NextJS 13</h1>
      <GeocoderControl />
    </main>
  );
};

export default Home;
