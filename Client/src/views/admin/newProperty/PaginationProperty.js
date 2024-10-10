import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const PaginationProperty = (props) => {
  const {
    currentPage,
    rangeData,
    setCurrentPage,
    setRangeData,
    pageOptions,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageCount,
  } = props;

  const [gopageValue, setGopageValue] = useState(currentPage + 1);

  useEffect(() => {
    setGopageValue(currentPage + 1);
  }, [currentPage]);

  const handlePageChange = (value) => {
    const page = value ? value - 1 : 0;
    setCurrentPage(page);
    setGopageValue(value);
  };

  return (
    <Flex
      justifyContent={pageOptions?.length !== 1 ? "space-between" : "end"}
      mt={2}
      alignItems="center"
    >
      {pageOptions?.length !== 1 && (
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => {
                setCurrentPage(0);
                setGopageValue(1);
              }}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={() => {
                previousPage();
                setGopageValue((pre) => pre - 1);
              }}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      )}

      <Flex alignItems="center">
        {pageOptions?.length !== 1 && (
          <>
            <Text flexShrink="0" mr={8}>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {currentPage + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
            <Text flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions?.length}
              value={gopageValue}
              onChange={(value) => handlePageChange(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </>
        )}
        <Select
          w={32}
          value={rangeData}
          onChange={(e) => {
            setRangeData(Number(e.target.value));
            setCurrentPage(0); // Reset to the first page on page size change
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Select>
      </Flex>

      {pageOptions?.length !== 1 && (
        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={() => {
                nextPage();
                setGopageValue((pre) => pre + 1);
              }}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => {
                setCurrentPage(pageCount - 1);
                setGopageValue(pageCount);
              }}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
};

export default PaginationProperty;
