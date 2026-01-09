import HomePage from "@pages/HomePage";
import Page2 from "@pages/Page2";
import Page3 from "@pages/Page3";

export const routes = [
  { path: "/home", element: <HomePage />, label: "home" },
  { path: "/page2", element: <Page2 />, label: "page2" },
  { path: "/page3", element: <Page3 />, label: "page3" },
];
