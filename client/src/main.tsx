import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Meta Pixel (ID real: 1017407324451494)
const metaPixel = document.createElement('script');
metaPixel.innerHTML = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1017407324451494');
fbq('track', 'PageView');
`;
document.head.appendChild(metaPixel);

// Carrega script de tracking com cupom
const script = document.createElement('script')
script.src = '/pixel-tracking-cupom.js'
script.async = true
document.head.appendChild(script)

createRoot(document.getElementById("root")!).render(<App />);
