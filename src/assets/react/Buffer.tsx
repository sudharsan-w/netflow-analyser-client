import * as React from "react";
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <style type="text/css">
      {
        "\n\t.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n"
      }
    </style>
    <line className="st0" x1={16} y1={3} x2={16} y2={8} />
    <line className="st0" x1={6.8} y1={6.8} x2={10.3} y2={10.3} />
    <line className="st0" x1={3} y1={16} x2={8} y2={16} />
    <line className="st0" x1={6.8} y1={25.2} x2={10.3} y2={21.7} />
    <line className="st0" x1={16} y1={29} x2={16} y2={24} />
    <line className="st0" x1={25.2} y1={25.2} x2={21.7} y2={21.7} />
    <line className="st0" x1={29} y1={16} x2={24} y2={16} />
    <line className="st0" x1={25.2} y1={6.8} x2={21.7} y2={10.3} />
  </svg>
);
export default SVGComponent;
