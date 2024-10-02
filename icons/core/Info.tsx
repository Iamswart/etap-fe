import * as React from "react";
import { SVGProps } from "react";

const Info = (props: SVGProps<SVGSVGElement>) => (
    <svg
        fill="none"
        height={18}
        viewBox="0 0 18 18"
        width={18}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
            fill={"currentColor" || props.fill}
            opacity={0.25}
        />
        <path
            d="M9 10.3125C9.3075 10.3125 9.5625 10.0575 9.5625 9.75V6C9.5625 5.6925 9.3075 5.4375 9 5.4375C8.6925 5.4375 8.4375 5.6925 8.4375 6V9.75C8.4375 10.0575 8.6925 10.3125 9 10.3125Z"
            fill={"currentColor" || props.fill}
        />
        <path
            d="M9.69 11.7152C9.6525 11.6252 9.6 11.5427 9.5325 11.4677C9.4575 11.4002 9.375 11.3477 9.285 11.3102C9.105 11.2352 8.895 11.2352 8.715 11.3102C8.625 11.3477 8.5425 11.4002 8.4675 11.4677C8.4 11.5427 8.3475 11.6252 8.31 11.7152C8.2725 11.8052 8.25 11.9027 8.25 12.0002C8.25 12.0977 8.2725 12.1952 8.31 12.2852C8.3475 12.3827 8.4 12.4577 8.4675 12.5327C8.5425 12.6002 8.625 12.6527 8.715 12.6902C8.805 12.7277 8.9025 12.7502 9 12.7502C9.0975 12.7502 9.195 12.7277 9.285 12.6902C9.375 12.6527 9.4575 12.6002 9.5325 12.5327C9.6 12.4577 9.6525 12.3827 9.69 12.2852C9.7275 12.1952 9.75 12.0977 9.75 12.0002C9.75 11.9027 9.7275 11.8052 9.69 11.7152Z"
            fill={"currentColor" || props.fill}
        />
    </svg>
);
export default Info;
