import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/index.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import Items from "./pages/items/index.jsx";
import AllItems from "./pages/items/all-items/index.jsx";
import NewItem from "./pages/items/new-item/index.jsx";
import ViewItem from "./pages/items/view-item/index.jsx";
import EditItem from "./pages/items/edit-item/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "items",
        element: <Items />,
        children: [
          {
            index: true,
            element: <AllItems />,
          },
          {
            path: ":id",
            element: <ViewItem />,
          },
          {
            path: "edit/:id",
            element: <EditItem />,
          },
          {
            path: "new",
            element: <NewItem />,
          },
        ],
      },
    ],
  },
]);

export default router;
