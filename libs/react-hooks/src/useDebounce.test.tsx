import { useDebounce } from "./useDebounce";
import { act, render } from "@testing-library/react";
import React, { FC, useState } from "react";
import { describe, test, expect } from "vitest";
const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe("useDebounce hook testing suite", function () {
  test("debounce work nice", async () => {
    const component = render(<Test />);
    const valueEl = await component.getByTestId("value");
    const buttonEl = await component.getByTestId("button");
    for (let i = 0; i < 5; i++) {
      buttonEl.click();
    }
    expect(valueEl.innerHTML).toBe("0");
    await wait(500);
    expect(valueEl.innerHTML).toBe("0");
    // `setTimeout`存在精度问题，在不影响结果的情况下多加100ms保证UT准确性
    await wait(600);
    expect(valueEl.innerHTML).toBe("1");
    for (let i = 0; i < 5; i++) {
      buttonEl.click();
    }
    // `setTimeout`存在精度问题，在不影响结果的情况下多加100ms保证UT准确性
    await wait(1100);
    expect(valueEl.innerHTML).toBe("2");
  });
});

const Test: FC = () => {
  const [value, setValue] = useState(0);
  function updateValue() {
    act(() => {
      // 函数直接使用state值的场景
      // value仍然能取到最新的值
      setValue(value + 1);
    });
  }
  const debouncedUpdateValue = useDebounce(updateValue, 1000);
  return (
    <div>
      <span data-testid="value">{value}</span>
      <button data-testid={"button"} onClick={debouncedUpdateValue}>
        button
      </button>
    </div>
  );
};
