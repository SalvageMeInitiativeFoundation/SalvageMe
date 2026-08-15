import React, { useEffect } from "react";
import { Pagination, Table } from "rsuite";
import { styled } from "styled-components";
import { capitalizeWords } from "../utils/constants";

import "rsuite/dist/rsuite-no-reset.min.css";

const { Column, HeaderCell, Cell } = Table;

export default function CustomTable({ data,loading }) {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [currentWidth, setCurrentWidth] = React.useState(
    Math.floor(Math.min(window.innerWidth * 0.95, 1000))
  );

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const newData = data.filter((_,i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(Math.floor(Math.min(window.innerWidth * 0.95, 1000)));
    };
    window.addEventListener("resize", handleResize);
    // initial
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  return (
    <TableWrapper>
      <div className="table-scroll">
        <Table height={460} data={newData} width={currentWidth} loading={loading} compact={true}>
        <Column minWidth={150} flexGrow={2} align="left" fullText={true}>
          <HeaderCell>Title</HeaderCell>
          <Cell>
            {(row) => (row.book_id && row.book_id.title) || row.title || "-"}
          </Cell>
        </Column>

        <Column minWidth={80} flexGrow={1} align="left" fullText={true}>
          <HeaderCell>Category</HeaderCell>
          <Cell>
            {(row) => (row.book_id && row.book_id.category) || capitalizeWords(row.category) || "-"}
          </Cell>
        </Column>

        <Column minWidth={70} flexGrow={1} align="left">
          <HeaderCell>Status</HeaderCell>
          <Cell>
    {(row) => {
      const status =
        row.status ||
        (row.book_id && row.book_id.status) ||
        "-";

      return <StatusBadge status={status}>{status}</StatusBadge>;
    }}
  </Cell>
        </Column>

        {/* <Column flexGrow={1}>
          <HeaderCell>Remarks</HeaderCell>
          <Cell dataKey="remark" />
        </Column> */}
      </Table>
      </div>
      <div style={{ padding: 20, width: "100%" }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[20, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .table-scroll {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;

  ${({ status }) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return `
          background: #fff3cd;
          color: #856404;
        `;

      case "approved":
        return `
          background: #d1ecf1;
          color: #0c5460;
        `;

      case "rejected":
        return `
          background: #f8d7da;
          color: #721c24;
        `;

      case "fulfilled":
        return `
          background: #d4edda;
          color: #155724;
        `;

      case "returned":
        return `
          background: #e2e3e5;
          color: #383d41;
        `;

      case "delivering":
        return `
          background: #cce5ff;
          color: #004085;
        `;

      default:
        return `
          background: #f1f3f5;
          color: #495057;
        `;
    }
  }}
`;

