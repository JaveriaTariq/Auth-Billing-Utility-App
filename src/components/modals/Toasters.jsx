import { toast } from "react-toastify";
const toastConfigSuccess = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  zIndex: 100,
};
const toastConfigError = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  zIndex: 100,
};
const toastConfigInfo = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  zIndex: 100,
};

export const successToast = (message) =>
  toast.success(message, toastConfigSuccess);
export const errorToast = (message) => toast.error(message, toastConfigError);
export const infoToast = (message) => toast.info(message, toastConfigInfo);



