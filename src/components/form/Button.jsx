import React from "react";
import Load from "../../assets/loading.gif";

export default function Button({ title, disabled = false }) {
  return (
    <>
      <button
        disabled={disabled}
        type="submit"
        className="border w-full md:h-11 h-12 rounded-lg border-slate-300 hover:ring-1 hover:ring-cyan-300 hover:border-slate-500 shadow-sm bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:ring-0 disabled:border-0 transition duration-300 dark:border-blue-300"
      >
        {disabled ? (
          <div className="flex justify-center">
            <svg
              className="w-8 h-8 "
              // width={120}
              // height={30}
              viewBox="0 0 120 30"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
            >
              <circle cx={15} cy={15} r={15}>
                <animate
                  attributeName="r"
                  from={15}
                  to={15}
                  begin="0s"
                  dur="0.8s"
                  values="15;9;15"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  from={1}
                  to={1}
                  begin="0s"
                  dur="0.8s"
                  values="1;.5;1"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={60} cy={15} r={9} fillOpacity="0.3">
                <animate
                  attributeName="r"
                  from={9}
                  to={9}
                  begin="0s"
                  dur="0.8s"
                  values="9;15;9"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  from="0.5"
                  to="0.5"
                  begin="0s"
                  dur="0.8s"
                  values=".5;1;.5"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={105} cy={15} r={15}>
                <animate
                  attributeName="r"
                  from={15}
                  to={15}
                  begin="0s"
                  dur="0.8s"
                  values="15;9;15"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  from={1}
                  to={1}
                  begin="0s"
                  dur="0.8s"
                  values="1;.5;1"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        ) : (
          title
        )}
      </button>
    </>
  );
}
