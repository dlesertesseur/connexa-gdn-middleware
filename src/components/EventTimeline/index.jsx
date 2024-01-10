/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Column from "./Column";
import Row from "./Row";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import Item from "./Item";

const EventTimeline = ({ startYear, endYear, data, h, headerHeight = 36, rowHeight = 46, onRowClick }) => {
  const targetRef = useRef();
  const itemRef = useRef();
  const [totalWidth, setTotalWidth] = useState(0);
  const [objCols, setObjCols] = useState(null);
  const [objRows, setObjRows] = useState(null);
  const [objItems, setObjItems] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [columnWidth, setColumnWidth] = useState(100);

  const [scrollXPos, setScrollXPos] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const [sizes, setSizes] = useState([100, "auto"]);

  useEffect(() => {
    const rect = targetRef?.current.getBoundingClientRect();

    let w = columnWidth * 12 * (endYear - startYear + 1);
    setTotalWidth(w);

    const columns = createMonthsList(startYear, endYear);
    setObjCols(columns);

    const rows = data?.map((r, index) => createRows(r, index));
    setObjRows(rows);

    const items = data?.map((r, index) => createItems(r, index));
    setObjItems(items);
  }, [startYear, endYear, data]);

  useEffect(() => {
    if (selectedRowId) {
      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);

      const items = data?.map((r, index) => createItems(r, index));
      setObjItems(items);
    }
  }, [selectedRowId]);

  const createMonthsList = (startYear, endYear) => {
    const ret = [];
    const totlalYears = endYear - startYear + 1;

    for (let years = 0; years < totlalYears; years++) {
      for (let months = 0; months < 12; months++) {
        const yyyy = startYear + years;
        const mm = months + 1;
        const id = `${yyyy}${mm.toString().padStart(2, "0")}`;
        const label = `${yyyy} / ${mm.toString().padStart(2, "0")}`;
        const col = <Column key={id} id={id} text={label} w={columnWidth} align={"center"} />;
        ret.push(col);
      }
    }
    return ret;
  };

  const onRowSelected = (id) => {
    setSelectedRowId(id);
    if (onRowClick) {
      onRowClick(id);
    }
  };

  const createRows = (r, index) => {
    const ret = (
      <Row key={r.id} id={r.id} order={index} selected={r.id === selectedRowId ? true : false} onClick={onRowSelected}>
        <Group px={3} h={rowHeight} justify="flex-start" align="center">
          {/* <Text fw={500} size="sm">
            {r.label}
          </Text> */}
        </Group>
      </Row>
    );
    return ret;
  };

  const createItems = (r, index) => {
    const bgColor = index % 2 === 0 ? "white" : "gray.2";
    const ret = (
      <Item
        key={r.id}
        id={r.id}
        label={r.label}
        order={index}
        selected={r.id === selectedRowId ? true : false}
        onClick={onRowSelected}
        bg={bgColor}
      >
        <Group px={3} h={rowHeight} justify="flex-start" align="center">
          {/* <Text fw={500} size="sm">
            {r.label}
          </Text> */}
        </Group>
      </Item>
    );
    return ret;
  };

  // function sort(data, property, direction) {
  //   data.sort(function (a, b) {
  //     var valueA = a[property];
  //     var valueB = b[property];

  //     if (direction === "asc") {
  //       return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  //     } else {
  //       return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
  //     }
  //   });
  // }

  return (
    <div style={{ height: h }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={150} maxSize="50%">
          <Stack h={h} gap={0} style={{ borderTop: "1px solid #C5C5C5", borderLeft: "1px solid #C5C5C5" }}>
            <Group gap={0} h={headerHeight} style={{ borderBottom: "1px solid #C5C5C5" }} />
            <ScrollArea viewportRef={itemRef} scrollbars={"y"} w={"100%"}>
              <Stack h={h - headerHeight} gap={0}>
                {objItems}
              </Stack>
            </ScrollArea>
          </Stack>
        </Pane>

        <Stack ref={targetRef} gap={"xs"} h={h} style={{ borderLeft: "1px solid #C5C5C5" }} bg={"red.3"}>
          <ScrollArea
            scrollbars={"x"}
            onScrollPositionChange={(e) => {
              setScrollXPos(e.x);
            }}
          >
            <Header h={headerHeight}>{objCols}</Header>
            <ScrollArea
              scrollbars={"y"}
              w={totalWidth}
              onScrollPositionChange={(e) => {
                itemRef?.current.scrollTo({ top: e.y });
              }}
            >
              <Body h={h - headerHeight}>{objRows}</Body>
            </ScrollArea>
          </ScrollArea>
        </Stack>
      </SplitPane>
    </div>
  );
};

export default EventTimeline;
