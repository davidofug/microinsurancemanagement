import React from "react";
import BarChart from "../figures/BarChart";
import { Row, Col } from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

export default function GraphContainer({ policies }) {
  return (
    <div className="shadow-sm p-3 mb-5 bg-body rounded graph-container">
      <div className="tw-flex tw-justify-between tw-px-3">
        <h5 className="tw-text-lg tw-font-medium">Monthly Stickers Issued</h5>
        <div className="tw-flex tw-gap-2 md:tw-gap-3 tw-text-sm">
          <div className="tw-flex tw-gap-1 tw-items-end">
            <span>
              <div className="tw-w-5 tw-h-5 tw-bg-[#E0E7EC] tw-rounded"></div>
            </span>
            <p>{new Date().getFullYear() - 1}</p>
          </div>
          <div className="tw-flex tw-gap-1 tw-items-end">
            <span>
              <div className="tw-w-5 tw-h-5 tw-bg-[#1f1f1f] tw-rounded"></div>
            </span>
            <p>{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      <Row
        style={{
          paddingTop: "3vh",
          paddingBottom: "2vh",
          paddingRight: "3vh",
        }}
      >
        <ErrorBoundary>
          <Col id="graph-space" className="graph-space">
            <BarChart policies={policies} />
          </Col>
        </ErrorBoundary>
      </Row>
      <Row style={{ diplay: "flex", justifyContent: "center" }}>
        <Col>
          <h6>Months</h6>
        </Col>
      </Row>
    </div>
  );
}
