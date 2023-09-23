import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 30000, // menunggu response dari serve dalam waktu 30 detik
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

axiosClient.interceptors.request.use(
    (config) => {
      // Di sini Anda dapat menambahkan logika untuk memperbarui token JWT
      // atau melakukan apa pun yang Anda butuhkan sebelum mengirim permintaan.
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let isRefreshing = false;
  let refreshSubscribers = [];


  axiosClient.interceptors.response.use((response)=>{
    return response;
  },
  async (error)=>{
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && error.response.data == "Token expired") {
      
      // originalRequest._retry = true;

      if (isRefreshing) {
        try {
          await new Promise((resolve) => subscribeTokenRefresh(resolve));
          return axiosClient(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosClient.post('/auth/refresh');
        refreshSubscribers.forEach((callback) => callback());
        refreshSubscribers = [];
        return axiosClient(originalRequest);
      } catch (_error) {
        if (_error.response.status == 500) {
        localStorage.removeItem('user');
        return Promise.reject(_error);
        }
      }finally {
        isRefreshing = false;
      }
     
    }

    if (error.response.status === 500 && error.response.data.error == "Token update failed") {
      localStorage.removeItem('user');
    }
    if (error.response.status === 401 && error.response.data == "Unauthorized") {
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
  
  )

  function subscribeTokenRefresh(callback) {
    refreshSubscribers.push(callback);
  }
  
  export default axiosClient;














// import axios from "axios";

// let isRefreshing = false;
// let refreshQueue = [];

// const processQueue = (error, token = null) => {
//   refreshQueue.forEach((promResolve) => {
//     if (error) {
//       promResolve(Promise.reject(error));
//     } else {
//       promResolve(token);
//     }
//   });

//   refreshQueue = [];
// };


// const axiosClient = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api',
//     timeout: 30000, // menunggu response dari serve dalam waktu 30 detik
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   axiosClient.interceptors.response.use((response)=>{
//     return response;
//   },
//   async (error)=>{
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry && error.response.data == "Token expired") {

//       if (isRefreshing) {
//         try {
//           await new Promise((resolve) => {
//             refreshQueue.push(resolve);
//           });

//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }


//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await axiosClient.post('/auth/refresh');
        
//         return axiosClient(originalRequest);
//       } catch (_error) {
//         processQueue(refreshError, null);
//         if (_error.response.status == 500) {
//         localStorage.removeItem('user');
//         return Promise.reject(_error);
//         }
//       }finally{
//         isRefreshing = false;
//       }
     
//     }

//         // if (error.response.status === 500 && error.response.data.error == "Failed to refresh token") {
//         //   localStorage.removeItem('user');
//         // }
//         // if (error.response.status === 401 && error.response.data == "Unauthorized") {
//         //   localStorage.removeItem('user');
//         // }
//     return Promise.reject(error);
//   }
  
//   )

//   export default axiosClient;









// import axios from "axios";


// const axiosClient = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api',
//     timeout: 30000, // menunggu response dari serve dalam waktu 30 detik
//     withCredentials: true,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   axiosClient.interceptors.response.use((response)=>{
//     return response;
//   },
//   async (error)=>{
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry && error.response.data == "Token expired") {
//       originalRequest._retry = true;
//       try {
//         await axiosClient.post('/auth/refresh');
//         return axiosClient(originalRequest);
//       } catch (_error) {
//         if (_error.response.status == 500) {
//         localStorage.removeItem('user');
//         return Promise.reject(_error);
//         }
//       }
     
//     }

//     if (error.response.status === 500 && error.response.data.error == "Failed to refresh token") {
//       localStorage.removeItem('user');
//     }
//     if (error.response.status === 401 && error.response.data == "Unauthorized") {
//       localStorage.removeItem('user');
//     }
//     return Promise.reject(error);
//   }
  
//   )

//   export default axiosClient;