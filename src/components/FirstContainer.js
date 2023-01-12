import React from "react";
import "../styles/dashboard.css";
import { Card } from "react-bootstrap";

export default function FirstContainer({ claimsSettled, policies, claims }) {
  return (
    <div
      id="bin"
      className="tw-bg-white tw-px-5 tw-py-5 tw-h-80 tw-flex tw-flex-col tw-gap-3
      tw-justify-between tw-w-full"
    >
      <div className="tw-w-full tw-h-1/2 tw-gap-3 tw-flex tw-justify-between">
        <div className="tw-w-1/2">
          <div className="tw-w-full tw-h-full tw-bg-[#804C75] tw-rounded-lg">
            <div className="px-3 py-2 tw-text-white">
              <div className="">Claim Settlements</div>
              <div className="tw-text-xl md:tw-text-3xl md:tw-mt-3">{`${claimsSettled.length}`}</div>
            </div>
          </div>
        </div>
        <div className="tw-w-1/2">
          <div className="tw-w-full tw-h-full tw-bg-[#FFB848] tw-rounded-lg">
            <div className=" px-3 py-2 tw-text-white">
              <div className="">Policies</div>
              <div className="tw-text-xl md:tw-text-3xl md:tw-mt-3">{`${policies.length}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-w-full tw-h-1/2 tw-gap-3 tw-flex tw-justify-between">
        <div className="tw-w-1/2">
          <div className="tw-w-full tw-h-full tw-rounded-lg tw-bg-[#C82E29]">
            <div className=" px-3 py-2 tw-text-white">
              <div className="">Stickers</div>
              <div className="tw-text-xl md:tw-text-3xl md:tw-mt-3">{`${policies.length}`}</div>
            </div>
          </div>
        </div>
        <div className="tw-w-1/2">
          <div className="tw-w-full tw-h-full tw-bg-[#1FBBA6] tw-rounded-lg">
            <div className="px-3 py-2 tw-text-white">
              <div className="">Claim Notifications</div>
              <div className="tw-text-xl md:tw-text-3xl md:tw-mt-3">{`${claims.length}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
