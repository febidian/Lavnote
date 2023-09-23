import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/form/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import Loading from "../../assets/svg/Loading";

export default function CreateNotes() {
  const title = useRef(null);
  const [newcategory, setNewcategory] = useState("");
  const [oldcategory, setOldcategory] = useState("");
  const [note, setNote] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [Images, setImages] = useState([]);
  const [errorImage, setErrorImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const handlerFileUpload = useCallback(
    (event) => {
      const files = event.target.files;
      const selectedFilesArray = Array.from(files);

      const maxsimal = selectedImages.length + selectedFilesArray.length;
      if (maxsimal > 8) {
        setErrorImage("Cannot upload files more than 8");
        event.preventDefault();
        return;
      }

      const imagesWithPreview = selectedFilesArray.map((image) => ({
        preview: URL.createObjectURL(image),
        file: image,
      }));
      setSelectedImages((prev) => prev.concat(imagesWithPreview));

      setErrorImage("");
    },
    [selectedImages]
  );

  const RemoveImageHandler = useCallback(
    (index) => {
      setSelectedImages(selectedImages.filter((i) => i.preview !== index));
    },
    [selectedImages]
  );

  useEffect(() => {
    const getCategory = async () => {
      try {
        let response = await axiosClient.get("/notes/select/category");
        console.log(response);
        setCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("category", newcategory || oldcategory);
    formData.append("note", note);

    selectedImages.map((image, index) => {
      formData.append("images[]", image.file);
    });
    try {
      let response = await axiosClient.post("/notes/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 201) {
        title.current.value = "";
        setNote("");
        setLoading(false);
        toast.success(response.data.message);
        return navigate("/");
      }
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedImages.length >= 0) {
      setErrorImage("");
    }
  }, [selectedImages]);

  return (
    <>
      <div className="flex justify-center my-14">
        <div className="xl:w-1/2 lg:w-4/5 lg:px-0 w-full md:px-12 sm:px-10 px-5">
          <form
            className="space-y-4"
            onSubmit={handlerSubmit}
            encType="multipart/form-data"
          >
            <div className="flex justify-between mb-14">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border h-10 w-24 inline-flex justify-center rounded-lg  text-sm text-slate-500 dark:text-slate-200 dark:hover:bg-slate-700 items-center shadow-sm hover:shadow-md hover:text-slate-700 border-yellow-300 dark:border-blue-600 transtition duration-300"
                >
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </span>
                  Back
                </button>
              </div>
              <div>
                <button
                  className="border h-10 w-24 inline-flex justify-center rounded-lg  text-sm text-slate-500 dark:text-slate-200 dark:hover:bg-slate-700 items-center shadow-sm hover:shadow-md hover:text-slate-700 border-yellow-300 dark:border-blue-600 transtition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      Save
                      <span className="ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div>
              <Label title={"Title*"} htmlFor={"title"} />
              <Input
                ref={title}
                name={"title"}
                placeholder={"Enter your title . . ."}
              />
              {errors && errors.title ? (
                <div className="mt-1 text-xs text-red-400">{errors.title}</div>
              ) : (
                ""
              )}
            </div>
            <div>
              <Label title={"Category"} />
              <div className="flex items-center w-full gap-x-3">
                <div className="md:w-9/12 w-1/2">
                  <label className="block text-[12px] text-slate-500 dark:text-slate-200 text-end -mb-2">
                    new category
                  </label>
                  <input
                    onChange={(e) => setNewcategory(e.target.value)}
                    disabled={oldcategory ? true : false}
                    className="mt-3 w-full rounded-md text-slate-800 px-3 md:h-11 sm:h-14 h-14 text-[15px] border-[1px] border-slate-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-300 transition duration-200 dark:text-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:placeholder:text-slate-400"
                    autoComplete="off"
                    placeholder="Enter your new category"
                  />
                </div>
                <div className="md:w-3/12 w-1/2 ">
                  <label className="block text-[12px] text-slate-500 dark:text-slate-200 text-end">
                    old category
                  </label>
                  <select
                    disabled={newcategory ? true : false}
                    onChange={(e) => setOldcategory(e.target.value)}
                    name=""
                    id=""
                    className="mt-1 w-full rounded-md text-slate-800 px-3 md:h-11 sm:h-14 h-14 text-[15px] border-[1px] border-slate-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-300 transition duration-200 dark:text-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:placeholder:text-slate-400 capitalize"
                  >
                    <option value="">Old category</option>
                    {category
                      ? category.map((c, i) => {
                          return (
                            <option key={i} value={c} className="capitalize">
                              {c}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div>
              </div>
              {errors && errors.category ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.category}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-full">
              <Label title={"Images"} />
              <div className="mt-3 flex flex-wrap w-full">
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <div key={index} className="w-1/4 p-1 ">
                        <div className="rounded-md overflow-hidden w-full h-32 relative">
                          <button
                            onClick={() => RemoveImageHandler(image.preview)}
                            className="absolute top-1 right-1 bg-white rounded-full p-[1px]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-slate-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <img
                            src={image.preview}
                            className="h-full w-full object-center object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-3">
                <label htmlFor="images">
                  <div
                    className={`w-full  rounded-md py-2 text-center border ${
                      selectedImages.length >= 8
                        ? "text-[15px] border-slate-400 bg-slate-100 text-slate-500   hover:text-slate-600"
                        : "text-[15px] border-slate-400 hover:ring-yellow-300 hover:border-yellow-500  dark:hover:ring-blue-600 dark:hover:border-blue-500 text-slate-500 dark:text-slate-200 cursor-pointer hover:bg-yellow-200 dark:hover:bg-blue-400 hover:text-slate-600"
                    }  transition-all duration-300 flex items-center justify-center`}
                  >
                    Selected your file images (Max 8){" "}
                    <span className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </span>
                  </div>
                </label>
                <input
                  disabled={selectedImages.length >= 8 ? true : false}
                  type="file"
                  id="images"
                  name="images"
                  onChange={handlerFileUpload}
                  multiple
                  max={8}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <div className="text-[13px] text-red-400 mt-1 text-center">
                  {errorImage && errorImage}
                </div>
                {errors && errors.images ? (
                  <div className="mt-1 text-xs text-red-400">
                    {errors.images}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <Label title={"Note*"} htmlFor="note" />
              <div className="text-editor mt-3">
                <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  onChange={(value) => setNote(value)}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                />
                {errors && errors.note ? (
                  <div className="mt-1 text-xs text-red-400">{errors.note}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
