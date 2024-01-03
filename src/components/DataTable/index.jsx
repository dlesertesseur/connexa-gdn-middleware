/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { LoadingOverlay, ScrollArea, Stack } from "@mantine/core";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Column from "./Column";
import Row from "./Row";
import Cell from "./Cell";

const DataTable = ({
  columns,
  data,
  h,
  headerHeight = 36,
  selectedRowId,
  setSelectedRowId,
  loading,
  scrollXPos,
  setScrollXPos,
  scrollYPos,
  setScrollYPos,
}) => {
  const targetRef = useRef();
  const scrollYRef = useRef();
  const scrollXRef = useRef();
  const [totalWidth, setTotalWidth] = useState(0);
  const [objCols, setObjCols] = useState(null);
  const [objRows, setObjRows] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();

    let w = 0;
    columns?.forEach((c) => {
      w += c.width ? c.width : 0;
    });

    const remainingWidth = rect.right - w;
    if (remainingWidth > 0) {
      columns[columns.length - 1].width = remainingWidth - 11;
      setTotalWidth(rect.right - 11);
    } else {
      setTotalWidth(w);
    }

    const cols = columns?.map((c, index) => createColumn(c, columns.length, index));
    setObjCols(cols);

    const rows = data?.map((r, index) => createRows(r, index));
    setObjRows(rows);
  }, [columns, data]);

  useEffect(() => {
    if (selectedRowId) {
      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);
    }
  }, [selectedRowId]);

  useEffect(() => {
    if (selectedColumnId) {
      const cols = columns?.map((c) => createColumn(c));
      setObjCols(cols);

      sort(data, selectedColumnId, sortOrder);

      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);
    }
  }, [selectedColumnId, sortOrder]);

  useLayoutEffect(() => {
    if (objRows && scrollYRef) {
      scrollYRef.current?.scrollTo({ top: scrollYPos });
    }
  }, [objRows]);

  const onRowSelected = (id) => {
    setSelectedRowId(id);
  };

  const onColumnSelected = (id) => {
    setSelectedColumnId(id);
    if (id === selectedColumnId) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("desc");
    }
  };

  const createColumn = (c, totalColumns, index) => {
    const ret = (
      <Column
        key={c.field}
        id={c.field}
        text={c.label}
        w={c.width}
        align={c.align}
        selected={c.field === selectedColumnId ? true : false}
        sortOrder={sortOrder}
        onClick={onColumnSelected}
        lastColumn={totalColumns - index > 1 ? false : true}
      />
    );
    return ret;
  };

  const createRows = (r, index) => {
    const selected = r.id === selectedRowId ? true : false;
    const ret = (
      <Row key={r.id} id={r.id} order={index} selected={selected} onClick={onRowSelected}>
        {createCells(r, index, selected)}
      </Row>
    );
    return ret;
  };

  const createCells = (r, rowIndex, selected) => {
    const fields = Object.entries(r);
    const map = new Map(fields);

    const cells = [];
    columns.forEach((c, index) => {
      let value = map.get(c.field);
      if (!value) {
        value = "";
      }

      const ret = (
        <Cell
          key={`row-${rowIndex}-cell-${index}`}
          value={value}
          w={c.width}
          align={c.align}
          order={index}
          type={c.type}
          action={c.action}
          selected={selected}
          defaultValue={c.default}
          lastColumn={columns.length - index > 1 ? false : true}
        />
      );
      cells.push(ret);
    });
    return cells;
  };

  function sort(data, property, direction) {
    data.sort(function (a, b) {
      var valueA = a[property];
      var valueB = b[property];

      if (direction === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  }

  return (
    <Stack ref={targetRef} gap={"xs"} h={h} style={{ border: "1px solid #C5C5C5" }}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <ScrollArea
          viewportRef={scrollXRef}
          scrollbars={"x"}
          onScrollPositionChange={(e) => {
            if (setScrollXPos) {
              setScrollXPos(e.x);
            }
          }}
        >
          <Header h={headerHeight}>{objCols}</Header>
          <ScrollArea
            viewportRef={scrollYRef}
            scrollbars={"y"}
            w={totalWidth}
            onScrollPositionChange={(e) => {
              if (setScrollYPos) {
                setScrollYPos(e.y);
              }
            }}
          >
            <Body h={h - headerHeight}>{objRows}</Body>
          </ScrollArea>
        </ScrollArea>
      )}
    </Stack>
  );
};

export default DataTable;
