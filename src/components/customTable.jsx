import React, { useEffect } from "react";
import { Pagination, Table } from "rsuite";
import { styled } from "styled-components";

import "rsuite/dist/rsuite-no-reset.min.css";

const { Column, HeaderCell, Cell } = Table;

export default function CustomTable({ data,loading }) {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [currentWidth, setCurrentWidth] = React.useState(
    window.innerWidth < 450 ? Math.floor(window.innerWidth * 0.9) : Math.floor(window.innerWidth * 0.7)
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
      setCurrentWidth( window.innerWidth < 450 ? Math.floor(window.innerWidth * 0.9) : Math.floor(window.innerWidth * 0.7));
    ;}, [window.innerWidth]);

  

  return (
    <TableWrapper>
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
            {(row) => (row.book_id && row.book_id.category) || row.category || "-"}
          </Cell>
        </Column>

        <Column minWidth={70} flexGrow={1} align="left">
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(row) => (row.status || (row.book_id && row.book_id.status) || "-")}
          </Cell>
        </Column>

        {/* <Column flexGrow={1}>
          <HeaderCell>Remarks</HeaderCell>
          <Cell dataKey="remark" />
        </Column> */}
      </Table>
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
  width:fit-content
`;

