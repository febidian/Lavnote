import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register";
import CreateNotes from "./pages/notes/CreateNotes";
import Auth from "./middleware/Auth";
import Guest from "./middleware/Guest";
import Home from "./pages/home/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { MeContextProvider } from "./context/MeContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import Notes from "./pages/notes/Notes";
import { NotesContextProvider } from "./context/NotesContext";
import { StarContextProvider } from "./context/StarContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import ShowDestroy from "./pages/notes/destroy/ShowDestroy";
import { DeletePermanentContextProvider } from "./context/DeletePermanentContext";
import UpdateNote from "./pages/notes/UpdateNote";
import { ShowNoteContextProvider } from "./context/ShowNoteContext";
import "react-photo-view/dist/react-photo-view.css";
import ShowShareNotes from "./pages/notes/ShowShareNotes";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "/",
        element: (
          <CategoryContextProvider>
            <StarContextProvider>
              <Home />
            </StarContextProvider>
          </CategoryContextProvider>
        ),
      },
      {
        path: "/createnotes",
        element: <CreateNotes />,
      },
      {
        path: "/notes/showdestroy",
        element: (
          <DeletePermanentContextProvider>
            <ShowDestroy />
          </DeletePermanentContextProvider>
        ),
      },
      {
        path: "/note/update/:note_id",
        element: (
          <CategoryContextProvider>
            <StarContextProvider>
              <ShowNoteContextProvider>
                <UpdateNote />
              </ShowNoteContextProvider>
            </StarContextProvider>
          </CategoryContextProvider>
        ),
      },
      {
        path: "/note/:note_id",
        element: (
          <CategoryContextProvider>
            <StarContextProvider>
              <ShowNoteContextProvider>
                <Notes />
              </ShowNoteContextProvider>
            </StarContextProvider>
          </CategoryContextProvider>
        ),
      },
      {
        path: "/note/:share_id/share",
        element: <ShowShareNotes />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <Guest />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeContextProvider>
    <AuthContextProvider>
      <MeContextProvider>
        <NotesContextProvider>
          <RouterProvider router={router} />
        </NotesContextProvider>
      </MeContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
  // </React.StrictMode>
);
