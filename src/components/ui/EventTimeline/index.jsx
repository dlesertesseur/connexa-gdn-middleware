/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Group, ScrollArea, Stack, Text, UnstyledButton } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { daysInMonth, daysInTimeFrame, daysInYear, diffBetweenDays } from "../../../utils/utils";
import Header from "./Header";
import Body from "./Body";
import Column from "./Column";
import Row from "./Row";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import Item from "./Item";
import Layer from "./Layer";

const EventTimeline = ({
  startYear,
  endYear,
  data,
  h,
  headerHeight = 36,
  rowHeight = 46,
  minItemWidth = 200,
  onRowClick,
  monthLabels = null,
  relationPixeDay = 5,
  onInspect,
  layers,
  center
}) => {
  const targetRef = useRef();
  const itemRef = useRef();
  const bodyRef = useRef();

  const [totalWidth, setTotalWidth] = useState(0);
  const [objCols, setObjCols] = useState(null);
  const [objRows, setObjRows] = useState(null);
  const [objItems, setObjItems] = useState(null);
  const [objLayers, setObjLayers] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [daysByYearMonth, setDaysByYearMonth] = useState(null);

  const [scrollXPos, setScrollXPos] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const [sizes, setSizes] = useState([200, "auto"]);

  useEffect(() => {
    if (data) {
      if (endYear > startYear) {
        setSizes([minItemWidth, "auto"]);

        const ret = daysInTimeFrame(startYear, endYear);
        setTotalDays(ret.totalDays);
        setDaysByYearMonth(ret.daysByYearMonth);

        const columns = createMonthsList(startYear, endYear, ret.daysByYearMonth);
        setObjCols(columns);

        const rows = data?.map((r, index) => createRows(r, index));
        setObjRows(rows);

        const items = data?.map((r, index) => createItems(r, index));
        setObjItems(items);

        const w = ret.totalDays * relationPixeDay;
        setTotalWidth(w);
      } else {
        if (endYear === startYear) {
          setSizes([minItemWidth, "auto"]);

          const ret = daysInYear(startYear);
          setTotalDays(ret);

          const columns = createMonthsListFromYear(startYear);
          setObjCols(columns);

          const rows = data?.map((r, index) => createRows(r, index));
          setObjRows(rows);

          const items = data?.map((r, index) => createItems(r, index));
          setObjItems(items);

          const w = ret * relationPixeDay;
          setTotalWidth(w);
        }
      }
    }
  }, [startYear, endYear, relationPixeDay, data]);

  useEffect(() => {
    if (selectedRowId) {
      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);

      const items = data?.map((r, index) => createItems(r, index));
      setObjItems(items);
    }
  }, [selectedRowId]);

  useEffect(() => {
    if (layers) {
      const ret = [];
      layers?.forEach((l) => {
        const obj = createObjLayers(l);
        if (obj) {
          ret.push(obj);
        }
      });
      setObjLayers(ret);
    }
  }, [layers]);

  function createObjLayers(layer, index) {
    let posX = 0;
    let ret = null;
    const startDate = new Date(startYear, 0, 1);

    const day1 = layer.startDateTime < startDate.getTime() ? startDate.getTime() : layer.startDateTime;

    if (layer.endDateTime.getTime() > day1) {
      const diffInDays = diffBetweenDays(day1, layer.endDateTime);

      const blockW = diffInDays * relationPixeDay;

      if (layer.startDateTime < startDate.getTime()) {
        posX = 0;
      } else {
        posX = diffBetweenDays(startDate, layer.startDateTime) * relationPixeDay;
      }

      ret = <Layer key={layer.id} id={layer.id} order={index} h={layer.h} w={blockW} left={posX} color={layer.color} />;
    }

    return ret;
  }

  const createMonthsList = (startYear, endYear, daysByYearMonth) => {
    const ret = [];
    const totlalYears = endYear - startYear + 1;

    for (let years = 0; years < totlalYears && daysByYearMonth; years++) {
      for (let month = 0; month < 12; month++) {
        const yyyy = startYear + years;
        const mm = month + 1;
        const id = `${yyyy}${mm.toString().padStart(2, "0")}`;
        const label = monthLabels ? monthLabels[month] : null;
        const text = `${yyyy} / ${mm.toString().padStart(2, "0")}`;
        const days = daysByYearMonth.get(`${yyyy}-${month}`);
        const columnWidth = days * relationPixeDay;
        const col = <Column key={id} id={id} text={text} label={label} w={columnWidth} align={"center"} />;
        ret.push(col);
      }
    }
    return ret;
  };

  const createMonthsListFromYear = (year) => {
    const ret = [];

    for (let month = 0; month < 12; month++) {
      const yyyy = year;
      const mm = month + 1;
      const id = `${yyyy}${mm.toString().padStart(2, "0")}`;
      const label = monthLabels ? monthLabels[month] : null;
      const text = `${yyyy} / ${mm.toString().padStart(2, "0")}`;
      const days = daysInMonth(month + 1, year);
      const columnWidth = days * relationPixeDay;
      const col = <Column key={id} id={id} text={text} label={label} w={columnWidth} align={"center"} />;
      ret.push(col);
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
    let posX = 0;
    const startDate = new Date(startYear, 0, 1);

    const day1 = r.startDateTime < startDate.getTime() ? startDate.getTime() : r.startDateTime;

    const diffInDays = diffBetweenDays(day1, r.endDateTime);

    const blockW = diffInDays * relationPixeDay;

    if (r.startDateTime < startDate.getTime()) {
      posX = 0;
    } else {
      posX = diffBetweenDays(startDate, r.startDateTime) * relationPixeDay;
    }

    const ret = (
      <Row key={r.id} id={r.id} order={index} selected={r.id === selectedRowId ? true : false} onClick={onRowSelected}>
        <Box py={2} pos={"relative"} h={rowHeight} w={blockW} left={posX}>
          <UnstyledButton
            onClick={() => {
              onInspect ? onInspect(r) : null;
            }}
            h={"100%"}
            w={"100%"}
            bg={r.color ? r.color : "orange"}
            style={{ borderRadius: 0 }}
          ></UnstyledButton>
        </Box>
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
        miw={minItemWidth}
      >
        <Stack gap={0} miw={minItemWidth} h={rowHeight} justify="center">
          <Group gap={0} px={3} justify="flex-start" align="center">
            <Text fw={500} size="sm" truncate="end">
              {r.name}
            </Text>
          </Group>
          <Group gap={0} px={3} justify="flex-start" align="center">
            <Text fw={600} size="xs" truncate="end">
              {r.description}
            </Text>
          </Group>
        </Stack>
      </Item>
    );
    return ret;
  };

  return (
    <div style={{ height: h}}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={minItemWidth} maxSize="50%">
          <Stack h={h} gap={0} style={{ borderTop: "1px solid #C5C5C5", borderLeft: "1px solid #C5C5C5" }}>
            <Group gap={0} h={headerHeight - 1} style={{ borderBottom: "1px solid #C5C5C5" }} />
            <ScrollArea
              //offsetScrollbars
              viewportRef={itemRef}
              scrollbars={"y"}
              w={"100%"}
              onScrollPositionChange={(e) => {
                bodyRef?.current.scrollTo({ top: e.y });
              }}
            >
              <Stack h={h - headerHeight} gap={0}>
                {objItems}
              </Stack>
            </ScrollArea>
          </Stack>
        </Pane>

        <Stack ref={targetRef} gap={"xs"} h={h} style={{ borderLeft: "1px solid #C5C5C5" }}>
          <ScrollArea
            offsetScrollbars
            scrollbars={"x"}
            onScrollPositionChange={(e) => {
              setScrollXPos(e.x);
            }}
          >
            <Header h={headerHeight}>{objCols}</Header>
            <ScrollArea
              type="never"
              viewportRef={bodyRef}
              scrollbars={"y"}
              w={totalWidth}
              onScrollPositionChange={(e) => {
                itemRef?.current.scrollTo({ top: e.y });
              }}
            >
              {objLayers}
              <Body h={h - headerHeight}>{objRows}</Body>
            </ScrollArea>
          </ScrollArea>
        </Stack>
      </SplitPane>
    </div>
  );
};

export default EventTimeline;
