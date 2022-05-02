import server from './server';

// get Reciters
const getReciters = () => {
  return new Promise( async (resolve, reject) => {
    const res = await server.get('/reciters');

    if(res.status == 200) resolve(res.data);

    reject(res.response || 'Unexpected Error!');
  });
}

// get Reciter
const getReciter = (id) => {
  return new Promise( async (resolve, reject) => {
    const res = await server.get(`/reciters/${id}`);

    if(res.status == 200) resolve(res.data);

    reject(res.response || 'Unexpected Error!');
  });
}









export {
  getReciters,
  getReciter
}