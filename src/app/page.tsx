"use client";

import Body from "@/components/body";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <Body />
    </Provider>
  );
}
