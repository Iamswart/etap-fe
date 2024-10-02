import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={18}
        viewBox="0 0 18 18"
        width={18}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M13.5 9.5625H4.5C4.1925 9.5625 3.9375 9.3075 3.9375 9C3.9375 8.6925 4.1925 8.4375 4.5 8.4375H13.5C13.8075 8.4375 14.0625 8.6925 14.0625 9C14.0625 9.3075 13.8075 9.5625 13.5 9.5625Z"
            fill="#032282"
        />
        <path
            d="M9 14.0625C8.6925 14.0625 8.4375 13.8075 8.4375 13.5V4.5C8.4375 4.1925 8.6925 3.9375 9 3.9375C9.3075 3.9375 9.5625 4.1925 9.5625 4.5V13.5C9.5625 13.8075 9.3075 14.0625 9 14.0625Z"
            fill="#032282"
        />
    </svg>
);
export default SVGComponent;
