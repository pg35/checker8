import { useState, useEffect } from "react";
import Main from "./components/Main";
import CreditCheck from "./components/CreditCheck";
import Scan from "./components/Scan";
import { Header } from "./components/styled";
import "./styles.css";
import { BuyCreditsPopup } from "./components/Popup";

export default function App() {
  const [state, setState] = useState({
    step: 1,
    status: 1,
    type: "text",
    text: "",
    rawText: "",
    rawFile: null,
    rawUrl: "",
    urlValidation: 0,
    sandbox: true,
    balance: 0,
    clean: false
  });
  useEffect(() => {
    const input = '{"org_name":"abc.txt", "upload_name":"abc1.txt"}';
    window.pxq_pgck = {
      product_url: "https://google.com",
      balance: 110,
      scan: {
        scan_id: "542",
        type: "url",
        text: "https:/google.com",
        credits: 1
        //rawInput: "this is a long raw text written\n for a raw",
        //rawInput: '{"org_name":"abc.txt", "upload_name":"abc1.txt"}'
      }
      //scan: null
    };
    let newState = {
      ...state,
      balance: window.pxq_pgck.balance,
      product_url: window.pxq_pgck.product_url
    };
    const scan = window.pxq_pgck.scan;
    if (scan) {
      newState = { ...newState, ...scan, step: 2, status: 2, clean: true };
    }
    setState(newState);
    window.pxq_pgck_bk = window.pxq_pgck;
    setTimeout(() => {
      window.pxq_pgck = null;
    }, 0);
    return () => {
      //console.log("app unmounted");
    };
  }, []);
  //console.log("app", state);
  let Comp = null;
  switch (state.step) {
    case 1:
      Comp = Main;
      break;
    case 2:
      Comp = CreditCheck;
      break;
    case 3:
      Comp = Scan;
      break;
    default:
      throw new Error("Unknown step");
  }
  //console.log("app render");

  return (
    <div className="App">
      <Header>
        <span>
          <strong>Your credits:</strong>
          {state.balance}
        </span>
      </Header>
      <Comp state={state} setState={setState} />
    </div>
  );
}
